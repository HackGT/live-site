import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import UpcomingEvents from "./UpcomingEvent";

interface Props {
  events: any[];
  loading: boolean;
}

const UpcomingEventsView: React.FC<Props> = ({ events, loading }) => {
  const partition = (arr: any[], property: string) => {
    const partitionedArray: { [date: string]: any[] } = {};
    arr.forEach((element: any) => {
      if (!partitionedArray[new Date(element[property]).toDateString()]) {
        partitionedArray[new Date(element[property]).toDateString()] = [];
      }
      partitionedArray[new Date(element[property]).toDateString()].push(element);
    });

    return partitionedArray;
  };

  if (loading) {
    return <Box />;
  }

  return (
    <Box
      paddingX={{
        base: "20px",
        md: "30px",
      }}
    >
      <Text fontSize="18px" marginBottom="20px">
        Coming Up
      </Text>
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
          There are no more events scheduled for this hackathon at this moment!
          <br />
          We look forward to seeing you at our next events :)
        </Flex>
      ) : (
        Object.keys(partition(events, "startDate")).map((date: any) => (
          <UpcomingEvents
            key={date.valueOf()}
            events={partition(events, "startDate")[date]}
            date={new Date(date)}
          />
        ))
      )}
    </Box>
  );
};

export default UpcomingEventsView;
