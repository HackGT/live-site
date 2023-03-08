import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Heading,
  HStack,
  Select,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { apiUrl, ErrorScreen, Service } from "@hex-labs/core";

import OngoingEventsView from "./OngoingEventsView";
import UpcomingEventsView from "./UpcomingEventsView";

const Dashboard: React.FC = () => {
  const [curHexathon, setCurHexathon] = useState<string>("");
  const [hexathons, setHexathons] = useState<any[]>([]);
  const [ongoingEvents, setOngoingEvents] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    
    const getData = async() => {
      const hexathonRes = await axios.get(apiUrl(Service.HEXATHONS, "/hexathons"));
      setHexathons(hexathonRes.data);
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

          if (!curHexathon) {
            setCurHexathon(sortedData[0].hexathon)
          }

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
      console.log(curDate)
      // console.log((new Date("10/22/2022 08:29 AM")).valueOf() - (new Date()).valueOf());
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
        <Heading>
          Schedule
        </Heading>
        <Spacer/>
        <Select
          width="225px"
          value={curHexathon}
          onChange={(e) => setCurHexathon(e.target.value)}
        >
          {
            hexathons.map((hexathon: any) => (
              <option key={hexathon.id} value={hexathon.id}>{hexathon.name}</option>
            ))
          }
        </Select>
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

export default Dashboard;
