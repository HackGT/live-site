import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { apiUrl, Service } from "@hex-labs/core";

import { EventCard } from "./EventCard";
import UpcomingEventsForDate from "./UpcomingEventsForDate";

const VolunteerSchedule: React.FC = () => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const getShifts = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/volunteer-shifts/me"), {
          params: { hexathon: String(process.env.REACT_APP_HEXATHON_ID) },
        });
        setShifts(res.data);
      } catch (e) {
        setShifts([]);
      }
    };

    getShifts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const activeShifts = shifts.filter((shift: any) => new Date(shift.endDate) >= now);
  const ongoingShifts = activeShifts.filter((shift: any) => new Date(shift.startDate) <= now);
  const upcomingShifts = activeShifts.filter((shift: any) => new Date(shift.startDate) > now);

  const upcomingByDate: { [date: string]: any[] } = {};
  upcomingShifts.forEach((shift: any) => {
    const date = new Date(shift.startDate).toDateString();
    upcomingByDate[date] = [...(upcomingByDate[date] ?? []), shift];
  });

  if (activeShifts.length === 0) {
    return null;
  }

  return (
    <Stack
      margin="auto"
      marginTop="10px"
      spacing="10px"
      paddingY="15px"
      width={{
        base: "95%",
        md: "85%",
      }}
      bg="rgba(123, 105, 236, 0.08)"
    >
      <Box
        paddingX={{
          base: "20px",
          md: "30px",
        }}
      >
        <Text fontSize="18px" marginBottom="20px" textAlign="center">
          My Volunteer Shifts
        </Text>
        {ongoingShifts.length > 0 && (
          <>
            <Text fontSize="16px" marginBottom="10px">
              Happening Now
            </Text>
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
              {ongoingShifts.map((shift: any) => (
                <EventCard key={shift.id} event={shift} points={0} isOngoing />
              ))}
            </SimpleGrid>
          </>
        )}
        {Object.keys(upcomingByDate).map(date => (
          <UpcomingEventsForDate
            key={date}
            events={upcomingByDate[date]}
            date={new Date(date)}
            eventTypePoints={{}}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default VolunteerSchedule;
