import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { apiUrl, Service, useAuth } from "@hex-labs/core";

import { HEXATHON_ID } from "../../../App";

type CheckoutType = "swag" | "hardware";

const decodeNfcRecord = (record: any): string => {
  const text = new TextDecoder(record.encoding || "utf-8").decode(record.data);
  const uid = JSON.parse(text)?.uid;
  if (typeof uid !== "string" || !uid.trim()) {
    throw new Error("missing uid");
  }
  return uid.trim();
};

const BadgeCheckout: React.FC = () => {
  const { user, loading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  const badgeInput = useRef<HTMLInputElement>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [participant, setParticipant] = useState<any>(null);
  const [swagItems, setSwagItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [checkoutType, setCheckoutType] = useState<CheckoutType>("swag");
  const [itemId, setItemId] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loadingParticipant, setLoadingParticipant] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      if (!loading) setRoleLoading(false);
      return;
    }
    axios
      .get(apiUrl(Service.USERS, `/users/${user.uid}`))
      .then(response => {
        const roles = response.data.roles || {};
        setHasAccess(Boolean(roles.member || roles.admin || roles.exec));
      })
      .catch(() => {
        setError("Unable to verify access.");
      })
      .finally(() => setRoleLoading(false));
  }, [user?.uid, loading]);

  const loadItems = async () => {
    const [swagResponse, inventoryResponse] = await Promise.all([
      axios.get(apiUrl(Service.HEXATHONS, "/swag-items"), { params: { hexathon: HEXATHON_ID } }),
      axios.get(apiUrl(Service.HARDWARE, "/inventory")),
    ]);
    setSwagItems(swagResponse.data);
    setInventory(inventoryResponse.data);
  };

  useEffect(() => {
    if (!hasAccess) return;
    loadItems();
  }, [hasAccess]);

  const loadParticipant = async (value: string) => {
    const participantId = value.trim();
    if (!participantId) return;
    setLoadingParticipant(true);
    setError("");
    try {
      const response = await axios.get(
        apiUrl(Service.HEXATHONS, `/hexathon-users/${HEXATHON_ID}/users/${participantId}`)
      );
      setParticipant(response.data);
      setUserId(participantId);
    } catch (requestError: any) {
      setParticipant(null);
      setError(requestError.response?.data?.message || "Participant was not found.");
    } finally {
      setLoadingParticipant(false);
    }
  };

  useEffect(() => {
    const hasUid = searchParams.has("uid");
    const hasType = searchParams.has("type");
    if (!hasUid && !hasType) return;

    const nextParams = new URLSearchParams(searchParams);

    if (hasUid) {
      const nextUid = (searchParams.get("uid") ?? "").trim();
      nextParams.delete("uid");
      setUserId(nextUid);
      if (nextUid) loadParticipant(nextUid);
    }

    if (hasType) {
      const nextType = (searchParams.get("type") ?? "").trim().toLowerCase();
      nextParams.delete("type");
      if (nextType === "swag" || nextType === "hardware") {
        setCheckoutType(nextType);
        setItemId("");
      }
    }

    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const startNfcScan = async () => {
    const Reader = (window as any).NDEFReader;
    if (!Reader) {
      setError("Web NFC is not available in this browser. Use the badge input instead.");
      badgeInput.current?.focus();
      return;
    }

    try {
      setScanning(true);
      const reader = new Reader();
      await reader.scan();
      reader.onreading = (event: any) => {
        setScanning(false);
        try {
          const value = decodeNfcRecord(event.message.records[0]);
          setError("");
          setUserId(value);
          loadParticipant(value);
        } catch {
          setError('The badge payload must be JSON like {"uid":"..."}.');
        }
      };
      reader.onreadingerror = () => {
        setScanning(false);
        setError("The badge could not be read. Please try again.");
      };
    } catch (requestError: any) {
      setScanning(false);
      setError(requestError.message || "Unable to start NFC scanning.");
    }
  };

  const submitCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!participant || !itemId || quantity < 1) return;
    setSubmitting(true);
    setError("");
    try {
      if (checkoutType === "swag") {
        await axios.post(
          apiUrl(
            Service.HEXATHONS,
            `/hexathon-users/${HEXATHON_ID}/users/${participant.userId}/actions/purchase-swag-item`
          ),
          { swagItemId: itemId, quantity }
        );
      } else {
        await axios.post(apiUrl(Service.HARDWARE, "/checkouts"), {
          inventoryId: Number(itemId),
          quantity,
          userId: participant.userId,
          name: participant.name,
        });
      }
      toast({ title: "Checkout complete", status: "success", duration: 3000, isClosable: true });
      await Promise.all([loadParticipant(participant.userId), loadItems()]);
      setItemId("");
      setQuantity(1);
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || roleLoading) return <Spinner />;
  if (!user || !hasAccess) return <Alert status="error">HexLabs Team access is required.</Alert>;

  const items = checkoutType === "swag" ? swagItems : inventory;
  const query = itemSearch.trim().toLowerCase();
  const filteredItems = items.filter(
    item => !query || String(item.id || item._id) === itemId || item.name?.toLowerCase().includes(query)
  );

  return (
    <VStack align="stretch" spacing={5} maxWidth="640px" margin="32px auto" padding="0 20px">
      <Heading size="lg">Checkout By ID</Heading>
      <Text>Scan a participant badge, then select the swag or hardware being issued.</Text>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <FormControl>
        <FormLabel>Participant badge</FormLabel>
        <HStack>
          <Input
            ref={badgeInput}
            value={userId}
            placeholder="Scan badge or enter participant user ID"
            onChange={event => setUserId(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Enter") loadParticipant(userId);
            }}
          />
          <Button type="button" onClick={() => loadParticipant(userId)} isLoading={loadingParticipant}>
            Go
          </Button>
        </HStack>
        <Button marginTop={2} onClick={startNfcScan} isLoading={scanning}>
          Scan NFC badge
        </Button>
      </FormControl>
      {loadingParticipant && <Spinner alignSelf="center" />}
      {participant && (
        <Alert status="info">
          <AlertIcon />
          {participant.name} has {participant.points?.currentTotal ?? 0} points.
        </Alert>
      )}
      <form onSubmit={submitCheckout}>
        <VStack align="stretch" spacing={4}>
          <ButtonGroup isAttached>
            <Button
              type="button"
              variant={checkoutType === "swag" ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => {
                setCheckoutType("swag");
                setItemId("");
                setItemSearch("");
              }}
            >
              Swag
            </Button>
            <Button
              type="button"
              variant={checkoutType === "hardware" ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => {
                setCheckoutType("hardware");
                setItemId("");
                setItemSearch("");
              }}
            >
              Hardware
            </Button>
          </ButtonGroup>
          <FormControl isRequired>
            <FormLabel>{checkoutType === "swag" ? "Swag item" : "Hardware inventory"}</FormLabel>
            <Input
              type="search"
              marginBottom={2}
              value={itemSearch}
              placeholder="Search items"
              onChange={event => setItemSearch(event.target.value)}
            />
            <Select value={itemId} onChange={event => setItemId(event.target.value)}>
              <option value="">Select an item</option>
              {filteredItems.map(item => (
                <option key={item.id || item._id} value={item.id || item._id}>
                  {item.name} {checkoutType === "swag" ? `(${item.points} points)` : `(${item.availableQuantity} available)`}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Quantity</FormLabel>
            <Input type="number" min={1} value={quantity} onChange={event => setQuantity(Number(event.target.value))} />
          </FormControl>
          <Button type="submit" colorScheme="teal" isLoading={submitting} isDisabled={!participant || !itemId}>
            Complete checkout
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default BadgeCheckout;
