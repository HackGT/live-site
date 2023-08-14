/* eslint-disable no-nested-ternary */
import React from "react";
import { Box, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import dateFormat from "dateformat";

interface Props {
  event: any;
}

const getPercentComplete = (date: Date, start: Date, end: Date) =>
  Math.ceil((100 * (date.valueOf() - start.valueOf())) / (end.valueOf() - start.valueOf()));

const getTimeRemainingString = (date1: Date, date2: Date) => {
  const diff = date2.valueOf() - date1.valueOf();
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  const mins = Math.ceil(diff / (1000 * 60));
  const seconds = Math.ceil(diff / 1000);
  return hours === 1 && mins === 1 && seconds <= 59
    ? `${seconds.toString()} seconds remaining`
    : hours === 1 && mins <= 59
    ? `${mins.toString()} minutes remaining`
    : `${hours.toString()} hours remaining`;
};

const OngoingEvent: React.FC<Props> = ({ event }) => (
  <Stack
    marginY="15px"
    minWidth="275px"
    width="275px"
    height="225px"
    paddingX="10px"
    paddingY="10px"
    spacing="2.5px"
    bg="white"
    borderRadius="5px"
  >
    <Text fontSize="16px" noOfLines={2}>
      {event.name}
    </Text>
    <Text fontSize="14px">
      {event.location.map((location: any, index: number) =>
        index === event.location.length ? location.name.concat(", ") : location.name
      )}
    </Text>
    <Text fontSize="12px" color="gray" maxHeight="92px" noOfLines={3}>
      {event.description}
    </Text>
    <Spacer />
    <Stack paddingTop="12px">
      <Text fontSize="14px">
        {dateFormat(event.startDate, "h:MM TT")} - {dateFormat(event.endDate, "h:MM TT")}
      </Text>
      <Text fontSize="12px">{getTimeRemainingString(new Date(), new Date(event.endDate))}</Text>

      <HStack spacing="0">
        <Box
          width={`${getPercentComplete(
            new Date(),
            new Date(event.startDate),
            new Date(event.endDate)
          )}%`}
          height="3px"
          bg="#7B69EC"
        />
        <Box
          width={`${
            100 - getPercentComplete(new Date(), new Date(event.startDate), new Date(event.endDate))
          }%`}
          height="3px"
          bg="#E6E6E6"
        />
      </HStack>
    </Stack>
  </Stack>
);

export default OngoingEvent;
