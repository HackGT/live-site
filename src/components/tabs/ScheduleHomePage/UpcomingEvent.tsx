import React from "react";
import { Box, Divider, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import dateFormat from "dateformat";

interface Props {
  events: any[];
  date: Date;
}

const UpcomingEventsForDate: React.FC<Props> = ({ events, date }) => (
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
      {events.map((event: any) => (
        <Stack
          id={event.id}
          minHeight="120px"
          bg="white"
          borderRadius="5px"
          paddingX="15px"
          paddingY="10px"
        >
          <Text fontSize="16px">{event.name}</Text>
          <Text color="#9A9FB2" fontSize="14px">
            {event.location.map((location: any, index: number) =>
              index === event.location.length
                ? location.name.concat(", ")
                : location.name.concat(
                    " • ",
                    dateFormat(event.startDate, "h:MM TT"),
                    " - ",
                    dateFormat(event.endDate, "h:MM TT")
                  )
            )}
          </Text>

          <Text fontSize="12px" color="#858585">
            {event.description}
          </Text>
        </Stack>
      ))}
    </SimpleGrid>
  </>
);

export default UpcomingEventsForDate;
