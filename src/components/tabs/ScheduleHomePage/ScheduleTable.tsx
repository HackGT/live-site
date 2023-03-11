import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  HStack,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { apiUrl, ErrorScreen, Service } from "@hex-labs/core";

import OngoingEventsView from "./OngoingEventsView";
import UpcomingEventsView from "./UpcomingEventsView";

const Schedule: React.FC = () => {
  
  const curHexathon = process.env.REACT_APP_HEXATHON_ID
  const [ongoingEvents, setOngoingEvents] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    
    const getData = async() => {

      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/events"), { params: { hexathon: curHexathon } });

        if (res.data) {
          const curDate = new Date();
          const sortedData = res.data.sort((a: any, b: any) => {
            const startDateA = new Date(a.startDate);
            const startDateB = new Date(b.startDate);
            const endDateA = new Date(a.endDate);
            const endDateB = new Date(b.endDate);
            if (startDateA > startDateB ) {
              return 1;
            }
            if (startDateA < startDateB) {
              return -1;
            } 
            if (endDateA > endDateB) {
              return 1;
            }
            if (endDateA < endDateB) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return -1;
          })

          const filteredData = sortedData.filter((event: any) => new Date(event.endDate) >= curDate);
          const ongoing = filteredData.filter((event: any) => new Date(event.startDate) <= curDate);
          const upcoming = filteredData.filter((event: any) => new Date(event.startDate) > curDate);

          setOngoingEvents(ongoing);
          setUpcomingEvents(upcoming);
        }
      } catch(e: any) {
        setError(e);
      }
      setLoading(false);
    }

    document.title = "HexLabs Schedule";
    setLoading(true);
    getData();
  }, [ curHexathon ]);

  useEffect(() => {
    const refreshData = setInterval(() => {
      const curDate = new Date((new Date()).valueOf());
      const temp = [...upcomingEvents];
      setUpcomingEvents(data => data.filter((event: any) => new Date(event.startDate) > curDate));
      setOngoingEvents(data => data.filter((event: any) => new Date(event.endDate) >= curDate)
                                    .concat(temp.filter((event: any) => new Date(event.startDate) <= curDate)));
    }, 1000)

    return () => clearInterval(refreshData);
  }, [ongoingEvents, upcomingEvents]);
  
  if (error) {
    return <ErrorScreen error={error} />
  }

  return (
    <>
      <HStack
        margin="auto"
        marginTop="20px"
        marginBottom="20px"
        width={{
          base: "90%",
          md: "80%"
        }}
      >
    
        <Spacer/>
      </HStack>
      <Stack
        margin="auto"
        spacing="10px"
        paddingY="15px"
        width={{
          base: "95%",
          md: "85%"
        }}
        bg="#F5F6FA"
      >
        <OngoingEventsView
          events={ongoingEvents}
          loading={loading}
        />
        <UpcomingEventsView
          events={upcomingEvents}
          loading={loading}
        />
      </Stack>
    </>
  );
};

export default Schedule;
