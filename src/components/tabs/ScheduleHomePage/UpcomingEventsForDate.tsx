import React from "react";
import { Box, Divider, Flex, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import dateFormat from "dateformat";
import { EventCard } from "./EventCard";

interface Props {
  events: any[];
  date: Date;
  eventTypePoints: any;
}

const UpcomingEventsForDate: React.FC<Props> = ({ events, date, eventTypePoints }) => (
  <>
    <HStack width="100%" marginBottom="10px">
      <Box whiteSpace="nowrap" color="#9A9FB2">
        {dateFormat(date, "dddd, mmmm d")}
      </Box>
      <Divider borderColor="#9A9FB2" />
    </HStack>
    <SimpleGrid
      marginBottom="15px"
      spacing="10px"
      columns={{
        base: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
    >
      {events.map((event: any) => {
        const points = eventTypePoints[event.type] ?? 0;
        return <EventCard key={event.id} event={event} points={points} isOngoing={false} />;
      })}
    </SimpleGrid>
  </>
);

export default UpcomingEventsForDate;
