import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import {
  Box,
  chakra,
  Text,
} from '@chakra-ui/react';

import { fetchAllEvents, fetchUpcomingEvents } from "../../../services/cmsService";

type Props = {
  tableLength: number;
  homepage: boolean;
  virtual: boolean;
};

const Schedule: React.FC<Props> = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);

  const formatDateString = (date: string) => dateFormat(date, "h:MM TT");
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
        if (getDayFromDate(sortedData[i].startDate) != getDayFromDate(sortedData[i + 1].startDate)) {
          elements.push(sortedData.slice(startIndex, i + 1));
          startIndex = i + 1;
        }
      }
      elements.push(sortedData.slice(startIndex, data.length));
      setEvents([...elements]);
      // setEvents(sortedData.slice(0, props.tableLength));
    };
    getEvents();
  }, []);

  const ScheduleTable = chakra(Box, {
    baseStyle: {
      borderRadius: "15px",
      boxShadow: "0px 2.5px 5px grey",
      overflow: "auto",
      maxHeight: "600px",
      minWidth: "1100px",
      paddingLeft: "25px",
      paddingRight: "25px",
      textAlign: "left"
    }
  })

  const DateHeader = chakra(Box, {
    baseStyle: {
      position: "sticky",
      top: 0,
      paddingTop: "20px",
      paddingBottom: "20px",
      borderBottomWidth: "2px",
      borderBottomColor: "black",
      bg: "white",
      fontSize: "28px",
      fontWeight: "bold"
    },
  })

  const EventRow = chakra(Box, {
    baseStyle: {
      minHeight: "120px",
      borderBottomWidth: "1px",
      borderBottomColor: "rgba(175, 175, 175, 0.3)",
    }
  })

  const StyledBox1 = chakra(Box, {
    baseStyle: {
      width: "20%",
      verticalAlign: "top",
      padding: "25px",
      fontSize: "13px",
      display: "inline-block"
    },
  })

  const StyledBox2 = chakra(Box, {
    baseStyle: {
      width: "80%",
      paddingTop: "25px",
      paddingBottom: "25px",
      display: "inline-block",
    }
  })

  return (
    <div className="schedule">
      <p className="schedule_title">Schedule</p>
      <ScheduleTable className="schedule_table">
        {events.map((chunk: any, index: any, arr: any) => (
        // {events.map((row: any, index: any) => (
        //   <>
        //   {
        //     (index == 0 || getDayFromDate(events[index - 1].startDate) != getDayFromDate(row.startDate)) ? (
        //       <>
        //         {(index != 0) ? (
        //           <Box height="40px"/>
        //         ) : (null)}
        //         <DateHeader>
        //          {`${getDayFromDate(row.startDate)}`}
        //        </DateHeader>
        //       </>
        //     ) : (null)
        //   }
        //   <EventRow key={row.id}>
        //     <StyledBox1>
        //       <Text marginBottom="15px" lineHeight="24px" fontWeight="semibold">
        //         {`${formatDateString(row.startDate)} - ${formatDateString(row.endDate)}`}
        //       </Text>
        //       <Text>
        //         {row.location.map((x: any) => x.name).join(", ")}
        //       </Text>
        //     </StyledBox1>
        //     <StyledBox2>
        //       <Text fontSize="20px" fontWeight="semibold" marginBottom="15px" lineHeight="24px">
        //         {row.name}
        //       </Text>
        //       <Text>
        //         {row.description}
        //       </Text>
        //     </StyledBox2>
        //     {/* <TableCell align="left">
        //       <a href={row.url} target="_blank">{row.url ? ("Join Here!"):("")}</a>
        //     </TableCell> */}
        //   </EventRow>
        // </>
          <Box key={chunk[0].startDate}>
            <DateHeader>
              {`${getDayFromDate(chunk[index].startDate)}`}
            </DateHeader>
            {events[index].map((row: any) => (
              <EventRow key={row.id}>
                <StyledBox1>
                  <Text marginBottom="15px" lineHeight="24px" fontWeight="semibold">
                    {`${formatDateString(row.startDate)} - ${formatDateString(row.endDate)}`}
                  </Text>
                  <Text>
                    {row.location.map((x: any) => x.name).join(", ")}
                  </Text>
                </StyledBox1>
                <StyledBox2>
                  <Text fontSize="20px" fontWeight="semibold" marginBottom="15px" lineHeight="24px">
                    {row.name}
                  </Text>
                  <Text>
                    {row.description}
                  </Text>
                </StyledBox2>
                {/* <TableCell align="left">
                  <a href={row.url} target="_blank">{row.url ? ("Join Here!"):("")}</a>
                </TableCell> */}
              </EventRow>
            ))}
            {(index !== arr.length) ? (
              <Box height="40px"/>
            ) : (null)}
          </Box>
        ))}
      </ScheduleTable>
    </div>
  );
};

export default Schedule;
