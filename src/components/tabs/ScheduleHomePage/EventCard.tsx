import React from "react";
import { Stack, Text, Flex, HStack, Box } from "@chakra-ui/react";
import dateFormat from "dateformat";

const getPercentComplete = (date: Date, start: Date, end: Date) =>
  Math.ceil((100 * (date.valueOf() - start.valueOf())) / (end.valueOf() - start.valueOf()));

const getTimeRemainingString = (date1: Date, date2: Date) => {
  const diff = date2.valueOf() - date1.valueOf();
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  const mins = Math.ceil(diff / (1000 * 60));
  const seconds = Math.ceil(diff / 1000);

  if (hours === 1 && mins === 1 && seconds <= 59) {
    return `${seconds.toString()} seconds remaining`;
  }
  if (hours === 1 && mins <= 59) {
    return `${mins.toString()} minutes remaining`;
  }
  return `${hours.toString()} hours remaining`;
};

export const EventCard: React.FC<{ event: any; points: number; isOngoing: boolean }> = ({
  event,
  points,
  isOngoing,
}) => {
  const timeLabel =
    event.startDate === event.endDate
      ? dateFormat(event.startDate, "h:MM TT")
      : `${dateFormat(event.startDate, "h:MM TT")} - ${dateFormat(event.endDate, "h:MM TT")}`;

  return (
    <Stack
      id={event.id}
      minHeight="120px"
      bg="white"
      animation={isOngoing? "ongoing-event-border-pulse 2s infinite" : "none"}
      borderRadius="5px"
      paddingX="15px"
      paddingY="10px"
      key={event.id}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="16px">{event.name}</Text>
        {points > 0 && (
          <Text fontSize="12px" color="#858585">
            {points} pts
          </Text>
        )}
      </Flex>
      <Text color="#9A9FB2" fontSize="14px">
        {event.location
          .map((location: any) => location.name)
          .join(" | ")
          .concat(" • ", timeLabel)}
      </Text>

      <Text fontSize="12px" color="#858585">
        {event.description}
      </Text>

      {isOngoing && (
        <Stack paddingTop="12px" marginTop="auto !important">
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
                100 -
                getPercentComplete(new Date(), new Date(event.startDate), new Date(event.endDate))
              }%`}
              height="3px"
              bg="#E6E6E6"
            />
          </HStack>
        </Stack>
      )}
    </Stack>
  );
};
