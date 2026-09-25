import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Code,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";
import ReactSelect from "react-select";

import { fetchAllUsers, getUserLabel } from "./users";

interface Props {
  onClose: () => void;
}

interface ImportResult {
  name: string;
  created: boolean;
  unmatched: string[];
  ambiguous: string[];
  shift?: any;
  error?: string;
}

const toIds = (values: any[] = []) => values.map((value: any) => value?.id ?? value);

const EVENT_TIME_ZONE = "America/New_York";

// Milliseconds EVENT_TIME_ZONE is ahead of UTC at the given instant
const getZoneOffset = (timestamp: number) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(timestamp)
    .reduce((acc: { [type: string]: number }, part) => ({ ...acc, [part.type]: +part.value }), {});
  const wallClockAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return wallClockAsUtc - Math.floor(timestamp / 1000) * 1000;
};

// UTC markers ("Z", "+00:00") are treated like no offset: import times are Eastern wall-clock
// times, and reading "09:00Z" as UTC would put the shift 4-5 hours early
const parseEventTime = (value: unknown) => {
  if (typeof value !== "string") return new Date(NaN);
  const match = value
    .trim()
    .match(
      /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?$/i
    );

  if (!match) return new Date(value);
  const [, year, month, day, hour, minute, second = "0", offset] = match;
  const isUtcMarker = !offset || /^(Z|[+-]00:?00)$/i.test(offset);
  if (!isUtcMarker) return new Date(value);

  const wallClockAsUtc = Date.UTC(+year, +month - 1, +day, +hour, +minute, +second);
  let timestamp = wallClockAsUtc - getZoneOffset(wallClockAsUtc);
  // Re-check at the resolved instant in case a daylight saving change falls in between
  timestamp = wallClockAsUtc - getZoneOffset(timestamp);
  return new Date(timestamp);
};

const formatEventTime = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    timeZone: EVENT_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  });

const ImportResultCard: React.FC<{
  result: ImportResult;
  users: any[];
  usersLoading: boolean;
  usersError?: string;
}> = ({ result, users, usersLoading, usersError }) => {
  const [assignees, setAssignees] = useState<string[]>(result.shift?.assignees ?? []);
  const [savedAssignees, setSavedAssignees] = useState<string[]>(result.shift?.assignees ?? []);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string>();
  const toast = useToast();

  const isDirty =
    assignees.length !== savedAssignees.length ||
    assignees.some(userId => !savedAssignees.includes(userId));

  const save = async () => {
    const { shift } = result;
    setSaving(true);
    setSaveError(undefined);
    try {
      // The PATCH endpoint $sets every field, so the full shift has to be sent back
      await axios.patch(apiUrl(Service.HEXATHONS, `/volunteer-shifts/${shift.id}`), {
        hexathon: shift.hexathon,
        name: shift.name,
        startDate: shift.startDate,
        endDate: shift.endDate,
        location: toIds(shift.location),
        tags: toIds(shift.tags),
        assignees,
      });
      setSavedAssignees(assignees);
      toast({
        title: "Success",
        description: `Updated people for ${shift.name}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e: any) {
      setSaveError(e.response?.data?.message ?? e.message);
    }
    setSaving(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="5px" padding="10px" fontSize="14px">
      <Text fontWeight="bold" color={result.created ? undefined : "red"}>
        {result.created ? "Created" : "Failed"}: {result.name}
      </Text>
      {result.shift && (
        <Text color="#858585">
          {formatEventTime(result.shift.startDate)} - {formatEventTime(result.shift.endDate)}{" "}
          (Eastern)
        </Text>
      )}
      {result.error && <Text color="red">{result.error}</Text>}
      {result.unmatched.length > 0 && (
        <Text color="orange.500">No user found: {result.unmatched.join(", ")}</Text>
      )}
      {result.ambiguous.length > 0 && (
        <Text color="orange.500">
          Multiple users match (not assigned): {result.ambiguous.join(", ")}
        </Text>
      )}
      {result.created && result.shift && (
        <Stack marginTop="10px" spacing="8px">
          <Text fontSize="13px" color="#858585">
            People
          </Text>
          <ReactSelect
            isMulti
            closeMenuOnSelect={false}
            isDisabled={usersLoading || users.length === 0}
            placeholder={usersLoading ? "Loading users..." : "Select Users..."}
            options={users.map((user: any) => ({ value: user.userId, label: getUserLabel(user) }))}
            onChange={e => setAssignees((e ?? []).map((option: any) => option.value))}
            value={assignees.map(userId => {
              const user = users.find((u: any) => u.userId === userId);
              return { value: userId, label: user ? getUserLabel(user) : userId };
            })}
          />
          {(saveError || usersError) && <Text color="red">{saveError ?? usersError}</Text>}
          <HStack>
            <Button size="sm" onClick={save} isLoading={saving} isDisabled={!isDirty}>
              Save People
            </Button>
          </HStack>
        </Stack>
      )}
    </Box>
  );
};

const EXAMPLE = `[
  {
    "name": "Check-in Desk",
    "startDate": "2026-10-10 09:00",
    "endDate": "2026-10-10 12:00",
    "location": ["Main Hall"],
    "assignees": ["Jane Doe", "John Smith"]
  }
]`;

const VolunteerEventImport: React.FC<Props> = ({ onClose }) => {
  const [json, setJson] = useState("");
  const [locations, setLocations] = useState<any[]>([]);
  const [parseError, setParseError] = useState<string>();
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string>();
  const toast = useToast();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setUsers(await fetchAllUsers());
      } catch (e) {
        setUsersError("Unable to load users.");
      }
      setUsersLoading(false);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/locations"));
        setLocations(res.data);
      } catch (e) {
        setLocations([]);
      }
    };

    getLocations();
  }, []);

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0];
    if (file) setJson(await file.text());
  };

  // Accepts location IDs or location names, since names are easier to write by hand
  const resolveLocations = (shiftLocations: string[] = []) =>
    shiftLocations.map(value => {
      const match = locations.find(
        (location: any) =>
          location.id === value || location.name?.toLowerCase() === value.trim().toLowerCase()
      );
      if (!match) throw new Error(`Unknown location "${value}"`);
      return match.id;
    });

  const parseShifts = () => {
    const parsed = JSON.parse(json);
    const shifts: any[] = Array.isArray(parsed) ? parsed : [parsed];

    shifts.forEach((shift, index) => {
      const label = shift?.name ? `"${shift.name}"` : `#${index + 1}`;
      if (!shift || typeof shift !== "object") throw new Error(`Shift ${label} must be an object`);
      if (!shift.name) throw new Error(`Shift ${label} is missing "name"`);
      if (Number.isNaN(parseEventTime(shift.startDate).valueOf()))
        throw new Error(`Shift ${label} has a missing or invalid "startDate"`);
      if (Number.isNaN(parseEventTime(shift.endDate).valueOf()))
        throw new Error(`Shift ${label} has a missing or invalid "endDate"`);
      if (parseEventTime(shift.startDate) > parseEventTime(shift.endDate))
        throw new Error(`Shift ${label} starts after it ends`);
      if (
        !Array.isArray(shift.assignees) ||
        !shift.assignees.every((a: unknown) => typeof a === "string")
      )
        throw new Error(`Shift ${label} needs "assignees" as an array of full names`);
      if (shift.location !== undefined && !Array.isArray(shift.location))
        throw new Error(`Shift ${label} needs "location" as an array`);
    });

    return shifts.map(shift => ({
      hexathon: String(process.env.REACT_APP_HEXATHON_ID),
      name: shift.name,
      startDate: parseEventTime(shift.startDate),
      endDate: parseEventTime(shift.endDate),
      location: resolveLocations(shift.location),
      tags: shift.tags ?? [],
      assignees: shift.assignees,
    }));
  };

  const submit = async () => {
    setParseError(undefined);
    setResults([]);

    let payloads: any[];
    try {
      payloads = parseShifts();
    } catch (e: any) {
      setParseError(e instanceof SyntaxError ? `Invalid JSON: ${e.message}` : e.message);
      return;
    }

    setImporting(true);
    const importResults: ImportResult[] = [];
    // Sequential so a failure partway through reports exactly which shifts were created
    // eslint-disable-next-line no-restricted-syntax
    for (const payload of payloads) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const res = await axios.post(
          apiUrl(Service.HEXATHONS, "/volunteer-shifts/import"),
          payload
        );
        importResults.push({
          name: payload.name,
          created: true,
          unmatched: res.data.unmatched ?? [],
          ambiguous: res.data.ambiguous ?? [],
          shift: res.data.shift,
        });
      } catch (e: any) {
        importResults.push({
          name: payload.name,
          created: false,
          unmatched: [],
          ambiguous: [],
          error: e.response?.data?.message ?? e.message,
        });
      }
    }
    setImporting(false);
    setResults(importResults);

    const createdCount = importResults.filter(result => result.created).length;
    toast({
      title: createdCount === payloads.length ? "Success" : "Import finished with problems",
      description: `Imported ${createdCount} of ${payloads.length} volunteer events.`,
      status: createdCount === payloads.length ? "success" : "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Stack spacing="20px">
      <Text fontSize="14px">
        Paste a volunteer event object or an array of them. Assignees are full names matched against
        registered users for this hackathon. Locations can be names or IDs. Times are Eastern (e.g.
        "2026-10-10 09:00"), including ones ending in "Z" or "+00:00". Only a non-zero offset like
        "-07:00" changes the timezone.
      </Text>
      <Code whiteSpace="pre" fontSize="12px" padding="10px" overflowX="auto">
        {EXAMPLE}
      </Code>
      <FormControl>
        <FormLabel>Upload JSON file</FormLabel>
        <Input type="file" accept=".json,application/json" padding="4px" onChange={handleFile} />
      </FormControl>
      <FormControl isInvalid={!!parseError}>
        <FormLabel>JSON</FormLabel>
        <Textarea
          fontFamily="mono"
          fontSize="12px"
          minHeight="240px"
          placeholder={EXAMPLE}
          value={json}
          onChange={e => setJson(e.target.value)}
        />
        <Box marginTop="6px" color="red">
          {parseError}
        </Box>
      </FormControl>

      {results.length > 0 && (
        <Stack spacing="10px">
          {results.map((result, index) => (
            <ImportResultCard
              // eslint-disable-next-line react/no-array-index-key
              key={result.shift?.id ?? index}
              result={result}
              users={users}
              usersLoading={usersLoading}
              usersError={usersError}
            />
          ))}
        </Stack>
      )}

      <HStack marginBottom="20px">
        <Button onClick={submit} isLoading={importing} isDisabled={!json.trim()}>
          Import
        </Button>
        <Button onClick={onClose}>{results.length > 0 ? "Done" : "Cancel"}</Button>
      </HStack>
    </Stack>
  );
};

export default VolunteerEventImport;
