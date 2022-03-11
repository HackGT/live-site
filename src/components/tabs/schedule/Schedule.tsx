import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Box, chakra } from "@chakra-ui/react";

import { fetchAllEvents, fetchUpcomingEvents } from "../../../services/cmsService";
import { EventRow } from "./EventRow";

type Props = {
  tableLength: number;
  homepage: boolean;
  virtual: boolean;
};

const Schedule: React.FC<Props> = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);

  const getDayFromDate = (date: string) => dateFormat(date, "dddd, mmm dS");

  useEffect(() => {
    const getEvents = async () => {
      let data;
      let startIndex = 0;
      const elements = [];
      if (props.homepage) {
        data = await fetchUpcomingEvents(props.virtual);
      } else {
        data = await fetchAllEvents(props.virtual);
      }
      const sortedData = data.allEvents.sort((a: any, b: any) => {
        const dateA = a.startDate;
        const dateB = b.startDate;
        return dateA >= dateB ? 1 : -1;
      });
      for (let i = 0; i < sortedData.length - 1; i++) {
        if (
          getDayFromDate(sortedData[i].startDate) !== getDayFromDate(sortedData[i + 1].startDate)
        ) {
          elements.push(sortedData.slice(startIndex, i + 1));
          startIndex = i + 1;
        }
      }
      elements.push(sortedData.slice(startIndex, data.length));
      setEvents([...elements]);
    };
    getEvents();
  }, []);

  const ScheduleTable = chakra(Box, {
    baseStyle: {
      maxWidth: "1100px",
      textAlign: "left",
      margin: "auto",
    },
  });

  const DateHeader = chakra(Box, {
    baseStyle: {
      position: "sticky",
      top: 0,
      padding: "20px",
      borderBottomWidth: "5px",
      borderImageSlice: 1,
      borderImageSource: "linear-gradient(to right, #33c2ff, #7b69ec)",
      bg: "white",
      fontSize: "32px",
      textTransform: "uppercase",
      zIndex: "999",
    },
  });

  return (
    <div className="schedule">
      <p className="schedule_title">Schedule</p>
      <ScheduleTable className="schedule_table">
        {events.map((chunk: any, index: any, arr: any) => (
          <Box key={chunk[0].startDate}>
            <DateHeader>
              <Box bgGradient="linear(to-r, #33c2ff, #7b69ec 30%)" bgClip="text">
                {`${getDayFromDate(chunk[index].startDate)}`}
              </Box>
            </DateHeader>
            {events[index].map((row: any) => (
              <EventRow row={row} />
            ))}
            {index !== arr.length ? <Box height="40px" /> : null}
          </Box>
        ))}
      </ScheduleTable>
    </div>
  );
};

export default Schedule;
