import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { apiUrl, Service } from "@hex-labs/core";

import UpcomingEvents from "./UpcomingEventsForDate";

interface Props {
  events: any[];
  loading: boolean;
  eventTypePoints: { [eventType: string]: number };
}

const UpcomingEventsView: React.FC<Props> = ({ events, loading, eventTypePoints }) => {
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
            eventTypePoints={eventTypePoints}
          />
        ))
      )}
    </Box>
  );
};

export default UpcomingEventsView;
