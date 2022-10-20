import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { Box, chakra } from "@chakra-ui/react";
import axios from "axios";

import { EventRow } from "./EventRow";
import { apiUrl, Service } from "@hex-labs/core";

type Props = {
  tableLength: number;
  homepage: boolean;
  virtual: boolean;
};

const HEXATHON_URL = String(process.env.REACT_APP_HEXATHON_URL);
const HEXATHON_ID = String(process.env.REACT_APP_HEXATHON_ID);

const Schedule: React.FC<Props> = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);

  const getDayFromDate = (date: string) => dateFormat(date, "dddd, mmm dS");

  const pullEvents = async (query: string) => {
    const eRes = await axios.get(apiUrl(Service.HEXATHONS, "/events/"), {
      params: {
        hexathon: query,
      },
    });
    return eRes.data;
  };

  useEffect(() => {
    const getEvents = async () => {
      let data;
      let res;
      let startIndex = 0;
      const elements = [];
      if (props.homepage) {
        res = await pullEvents(HEXATHON_ID);
        // data = await fetchUpcomingEvents(props.virtual);
      } else {
        res = await pullEvents(HEXATHON_ID);
        data = res.data;
        // data = await fetchAllEvents(props.virtual);
      }
      const sortedData = data.sort((a: any, b: any) => {
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
      console.log(data);
      console.log("is this working");
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
      textTransform: "uppercase",
      zIndex: "999",
    },
  });

  return (
    <div className="schedule">
      <Box className="schedule_title" fontSize={{ base: "36px", md: "50px" }}>
        Schedule
      </Box>
      <ScheduleTable className="schedule_table">
        {events.map((chunk: any, index: any, arr: any) => (
          <Box key={chunk[0].startDate}>
            <DateHeader>
              <Box
                bgGradient="linear(to-r, #33c2ff, #7b69ec 30%)"
                bgClip="text"
                fontSize={{ base: "24px", md: "32px" }}
              >
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
