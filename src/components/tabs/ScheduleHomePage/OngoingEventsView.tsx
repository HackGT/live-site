import React from "react";
import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { LoadingScreen } from "@hex-labs/core";

import { EventCard } from "./EventCard";

interface Props {
  events: any[];
  loading: boolean;
  eventTypePoints: { [key: string]: number };
}

const OngoingEventsView: React.FC<Props> = ({ events, loading, eventTypePoints }) => {
  if (loading) {
    return (
      <Box marginTop="-110px" marginBottom="-90px">
        <LoadingScreen />
      </Box>
    );
  }

  return (
    <Box
      marginX="20px"
      paddingX={{
        base: "0px",
        md: "10px",
      }}
    >
      <Text fontSize="18px" marginBottom="10px">
        What's Happening Now
      </Text>
      <SimpleGrid
      marginBottom="15px"
      spacing="10px"
      columns={{
        base: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}>
        {events.length === 0 ? (
          <Flex
            margin="auto"
            width="90%"
            height="120px"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            fontStyle="italic"
          >
            There are currently no ongoing events for this hackathon!
            <br />
            Please come back later or see below for upcoming events!
          </Flex>
        ) : (
          events.map((event: any) => (
            <EventCard
              key={event.id}
              event={event}
              points={eventTypePoints[event.type] ?? 0}
              isOngoing
            />
          ))
        )}
      </SimpleGrid>
    </Box>
  );
};

export default OngoingEventsView;
