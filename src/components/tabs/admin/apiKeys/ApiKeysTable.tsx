import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, ErrorScreen, LoadingScreen, Service } from "@hex-labs/core";
import {
  Badge,
  Box,
  Button,
  Code,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Select,
  Spacer,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const ApiKeysTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [hexathons, setHexathons] = useState<any[]>([]);
  const [hexathon, setHexathon] = useState(String(process.env.REACT_APP_HEXATHON_ID));
  const [provider, setProvider] = useState("");
  const [claimed, setClaimed] = useState("");
  const [data, setData] = useState<any>(null);
  const [showKeys, setShowKeys] = useState(false);
  const [error, setError] = useState();

  const [newKeys, setNewKeys] = useState("");
  const [newProvider, setNewProvider] = useState("openai");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getHexathons = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/hexathons"));
        setHexathons(res.data);
      } catch (e: any) {
        setError(e);
      }
    };
    document.title = "API Keys";
    getHexathons();
  }, []);

  useEffect(() => {
    const getKeys = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/api-keys"), {
          params: { hexathon, provider: provider || undefined, claimed: claimed || undefined },
        });
        setData(res.data);
      } catch (e: any) {
        setError(e);
      }
    };
    if (hexathon) {
      getKeys();
    }
  }, [hexathon, provider, claimed, isOpen]);

  const submitKeys = async () => {
    const keys = newKeys
      .split("\n")
      .map(key => key.trim())
      .filter(key => key.length > 0);

    if (keys.length === 0) {
      toast({ title: "Enter at least one key", status: "warning", duration: 3000 });
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(apiUrl(Service.HEXATHONS, "/api-keys"), {
        hexathon,
        provider: newProvider,
        keys,
      });
      toast({
        title: `Added ${res.data.inserted} keys`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setNewKeys("");
      onClose();
    } catch (e: any) {
      toast({
        title: "Unable to add keys",
        description: e?.response?.data?.message ?? "Duplicate keys are rejected.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Box margin="auto" marginTop="20px" width={{ base: "90%", md: "80%" }}>
        <HStack marginBottom="15px">
          <Heading>API Keys</Heading>
          <Spacer />
          <Button leftIcon={<AddIcon width="0.8em" height="0.8em" />} onClick={onOpen}>
            Add Keys
          </Button>
        </HStack>

        <StatGroup marginBottom="15px">
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>{data.total}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Claimed</StatLabel>
            <StatNumber>{data.claimed}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Available</StatLabel>
            <StatNumber>{data.available}</StatNumber>
          </Stat>
        </StatGroup>

        <HStack marginBottom="15px" spacing="10px" flexWrap="wrap">
          <Select
            width="auto"
            value={hexathon}
            onChange={e => setHexathon(e.target.value)}
            aria-label="Hexathon"
          >
            {hexathons.map((entry: any) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </Select>
          <Select
            width="auto"
            value={provider}
            onChange={e => setProvider(e.target.value)}
            aria-label="Provider"
          >
            <option value="">All providers</option>
            {data.providers.map((entry: string) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </Select>
          <Select
            width="auto"
            value={claimed}
            onChange={e => setClaimed(e.target.value)}
            aria-label="Claimed status"
          >
            <option value="">All keys</option>
            <option value="true">Claimed</option>
            <option value="false">Unclaimed</option>
          </Select>
          <Button variant="outline" onClick={() => setShowKeys(!showKeys)}>
            {showKeys ? "Hide keys" : "Show keys"}
          </Button>
        </HStack>

        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Key</Th>
                <Th>Provider</Th>
                <Th>Status</Th>
                <Th>Claimed By</Th>
                <Th>Email</Th>
                <Th>Claimed At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.keys.map((apiKey: any) => (
                <Tr key={apiKey.id}>
                  <Td>
                    <Code>
                      {showKeys
                        ? apiKey.key
                        : `${apiKey.key.slice(0, 8)}...${apiKey.key.slice(-4)}`}
                    </Code>
                  </Td>
                  <Td>{apiKey.provider}</Td>
                  <Td>
                    <Badge colorScheme={apiKey.hexathonUser ? "green" : "gray"}>
                      {apiKey.hexathonUser ? "Claimed" : "Available"}
                    </Badge>
                  </Td>
                  <Td>{apiKey.hexathonUser?.name ?? "—"}</Td>
                  <Td>{apiKey.hexathonUser?.email ?? "—"}</Td>
                  <Td>
                    {apiKey.claimedAt ? new Date(apiKey.claimedAt).toLocaleString() : "—"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {data.keys.length === 0 && (
          <Text marginTop="20px" textAlign="center">
            No keys match these filters.
          </Text>
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottom="2px" borderColor="rgba(23, 43, 77, 0.12)">
            Add API Keys
          </DrawerHeader>
          <DrawerBody paddingTop="20px">
            <Text marginBottom="10px">Adding to {hexathons.find((h: any) => h.id === hexathon)?.name}</Text>
            <Select
              marginBottom="10px"
              value={newProvider}
              onChange={e => setNewProvider(e.target.value)}
              aria-label="New key provider"
            >
              <option value="openai">openai</option>
              <option value="anthropic">anthropic</option>
              <option value="gemini">gemini</option>
            </Select>
            <Textarea
              placeholder="One key per line"
              rows={12}
              value={newKeys}
              onChange={e => setNewKeys(e.target.value)}
            />
            <Button
              marginTop="15px"
              colorScheme="blue"
              isLoading={submitting}
              onClick={submitKeys}
              width="100%"
            >
              Add Keys
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ApiKeysTable;
