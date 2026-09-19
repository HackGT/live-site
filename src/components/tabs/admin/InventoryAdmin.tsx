import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { apiUrl, Service, useAuth } from "@hex-labs/core";

interface InventoryRecord {
  id: number;
  name: string;
  event?: string | null;
  size?: string | null;
  quantity: number;
  availableQuantity: number;
  notes?: string | null;
}

interface InventoryForm {
  name: string;
  event: string;
  size: string;
  quantity: number;
  notes: string;
}

const emptyForm: InventoryForm = { name: "", event: "", size: "", quantity: 0, notes: "" };

const InventoryAdmin: React.FC = () => {
  const { user, loading } = useAuth();
  const toast = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [checkouts, setCheckouts] = useState<any[]>([]);
  const [form, setForm] = useState<InventoryForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      setRoleLoading(false);
      return;
    }
    axios
      .get(apiUrl(Service.USERS, `/users/${user.uid}`))
      .then(response => setIsAdmin(Boolean(response.data.roles?.admin)))
      .catch(() => setError("Unable to verify admin access."))
      .finally(() => setRoleLoading(false));
  }, [user?.uid]);

  const loadData = async () => {
    setLoadingData(true);
    setError("");
    try {
      const [inventoryResponse, checkoutResponse] = await Promise.all([
        axios.get(apiUrl(Service.HARDWARE, "/inventory")),
        axios.get(apiUrl(Service.HARDWARE, "/checkouts")),
      ]);
      setInventory(inventoryResponse.data);
      setCheckouts(checkoutResponse.data);
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || "Unable to load inventory.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  const updateForm = (field: keyof InventoryForm, value: string | number) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const submitInventory = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        event: form.event,
        size: form.size,
        quantity: Number(form.quantity),
        notes: form.notes,
      };
      if (editingId === null) {
        await axios.post(apiUrl(Service.HARDWARE, "/inventory"), payload);
      } else {
        await axios.patch(apiUrl(Service.HARDWARE, `/inventory/${editingId}`), payload);
      }
      toast({
        title: editingId === null ? "Inventory item created" : "Inventory item updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || "Unable to save inventory item.");
    } finally {
      setSubmitting(false);
    }
  };

  const editInventory = (item: InventoryRecord) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      event: item.event || "",
      size: item.size || "",
      quantity: item.quantity,
      notes: item.notes || "",
    });
  };

  const returnCheckout = async (checkoutId: number) => {
    try {
      await axios.post(apiUrl(Service.HARDWARE, `/checkouts/${checkoutId}/return`));
      toast({ title: "Item returned", status: "success", duration: 3000, isClosable: true });
      await loadData();
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || "Unable to return item.");
    }
  };

  if (loading || roleLoading) return <Spinner />;
  if (!user || !isAdmin) return <Alert status="error">Admin access is required.</Alert>;

  return (
    <VStack align="stretch" spacing={8} maxWidth="1100px" margin="32px auto" padding="0 20px">
      <Box>
        <Heading size="lg">Hardware Inventory</Heading>
        <Text color="gray.600" marginTop={2}>
          Track stock, active checkouts, and returned equipment.
        </Text>
      </Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Box borderWidth="1px" borderRadius="4px" padding={5}>
        <Heading size="md" marginBottom={4}>
          {editingId === null ? "Add inventory" : "Edit inventory"}
        </Heading>
        <form onSubmit={submitInventory}>
          <Stack spacing={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={form.name} onChange={event => updateForm("name", event.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Total quantity</FormLabel>
                <Input
                  type="number"
                  min={0}
                  value={form.quantity}
                  onChange={event => updateForm("quantity", Number(event.target.value))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Event</FormLabel>
                <Input value={form.event} onChange={event => updateForm("event", event.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Size</FormLabel>
                <Input value={form.size} onChange={event => updateForm("size", event.target.value)} />
              </FormControl>
            </SimpleGrid>
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Input value={form.notes} onChange={event => updateForm("notes", event.target.value)} />
            </FormControl>
            <Stack direction={{ base: "column", sm: "row" }}>
              <Button type="submit" colorScheme="teal" isLoading={submitting}>
                {editingId === null ? "Add item" : "Save changes"}
              </Button>
              {editingId !== null && (
                <Button variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                  Cancel
                </Button>
              )}
            </Stack>
          </Stack>
        </form>
      </Box>
      <Box overflowX="auto">
        <Heading size="md" marginBottom={3}>Inventory</Heading>
        {loadingData ? <Spinner /> : (
          <Table variant="simple">
            <Thead><Tr><Th>Name</Th><Th>Event</Th><Th>Size</Th><Th isNumeric>Available</Th><Th isNumeric>Total</Th><Th /></Tr></Thead>
            <Tbody>
              {inventory.map(item => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.event || "-"}</Td>
                  <Td>{item.size || "-"}</Td>
                  <Td isNumeric>{item.availableQuantity}</Td>
                  <Td isNumeric>{item.quantity}</Td>
                  <Td><Button size="sm" onClick={() => editInventory(item)}>Edit</Button></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <Box overflowX="auto">
        <Heading size="md" marginBottom={3}>Active checkouts</Heading>
        <Table variant="simple">
          <Thead><Tr><Th>Item</Th><Th>User</Th><Th isNumeric>Quantity</Th><Th>Checked out</Th><Th /></Tr></Thead>
          <Tbody>
            {checkouts.filter(checkout => !checkout.returnedAt).map(checkout => (
              <Tr key={checkout.id}>
                <Td>{checkout.inventory?.name || "-"}</Td>
                <Td>{checkout.user?.name || checkout.userId}</Td>
                <Td isNumeric>{checkout.quantity}</Td>
                <Td>{new Date(checkout.checkedOutAt).toLocaleString()}</Td>
                <Td><Button size="sm" onClick={() => returnCheckout(checkout.id)}>Mark returned</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default InventoryAdmin;