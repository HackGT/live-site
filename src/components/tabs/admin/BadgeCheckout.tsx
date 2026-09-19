import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { apiUrl, Service, useAuth } from "@hex-labs/core";

import { HEXATHON_ID } from "../../App";

type CheckoutType = "swag" | "hardware";

const decodeNfcRecord = (record: any): string => {
  const bytes = new Uint8Array(record.data.buffer, record.data.byteOffset, record.data.byteLength);
  if (record.recordType === "text" && bytes.length > 0) {
    return new TextDecoder().decode(bytes.slice(1 + (bytes[0] & 0x3f))).trim();
  }
  return new TextDecoder().decode(bytes).trim();
};

const BadgeCheckout: React.FC = () => {
  const { user, loading } = useAuth();
  const toast = useToast();
  const badgeInput = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);
  const [badgeValue, setBadgeValue] = useState("");
  const [participant, setParticipant] = useState<any>(null);
  const [swagItems, setSwagItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [checkoutType, setCheckoutType] = useState<CheckoutType>("swag");
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loadingParticipant, setLoadingParticipant] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) return;
    axios.get(apiUrl(Service.USERS, `/users/${user.uid}`)).then(response => {
      setIsAdmin(Boolean(response.data.roles?.admin));
      setRoleLoading(false);
    });
  }, [user?.uid]);

  useEffect(() => {
    if (!isAdmin) return;
    Promise.all([
      axios.get(apiUrl(Service.HEXATHONS, "/swag-items"), { params: { hexathon: HEXATHON_ID } }),
      axios.get(apiUrl(Service.HARDWARE, "/inventory")),
    ]).then(([swagResponse, inventoryResponse]) => {
      setSwagItems(swagResponse.data);
      setInventory(inventoryResponse.data);
    });
  }, [isAdmin]);

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
      setBadgeValue(participantId);
    } catch (requestError: any) {
      setParticipant(null);
      setError(requestError.response?.data?.message || "Participant was not found.");
    } finally {
      setLoadingParticipant(false);
    }
  };

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
        const record = event.message.records[0];
        const value = decodeNfcRecord(record);
        setScanning(false);
        setBadgeValue(value);
        loadParticipant(value);
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
      await loadParticipant(participant.userId);
      setItemId("");
      setQuantity(1);
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || roleLoading) return <Spinner />;
  if (!user || !isAdmin) return <Alert status="error">Admin access is required.</Alert>;

  const items = checkoutType === "swag" ? swagItems : inventory;

  return (
    <VStack align="stretch" spacing={5} maxWidth="640px" margin="32px auto" padding="0 20px">
      <Heading size="lg">Badge Checkout</Heading>
      <Text>Scan a participant badge, then select the swag or hardware being issued.</Text>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <FormControl>
        <FormLabel>Participant badge</FormLabel>
        <Input
          ref={badgeInput}
          value={badgeValue}
          placeholder="Scan badge or enter participant user ID"
          onChange={event => setBadgeValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === "Enter") loadParticipant(badgeValue);
          }}
        />
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
          <FormControl>
            <FormLabel>Checkout type</FormLabel>
            <Select
              value={checkoutType}
              onChange={event => {
                setCheckoutType(event.target.value as CheckoutType);
                setItemId("");
              }}
            >
              <option value="swag">Swag</option>
              <option value="hardware">Hardware</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{checkoutType === "swag" ? "Swag item" : "Hardware inventory"}</FormLabel>
            <Select value={itemId} onChange={event => setItemId(event.target.value)}>
              <option value="">Select an item</option>
              {items.map(item => (
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