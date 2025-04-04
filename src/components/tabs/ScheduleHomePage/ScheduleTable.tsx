import React, { useState, useEffect } from "react";
import axios from "axios";
import { HStack, Spacer, Stack } from "@chakra-ui/react";
import { apiUrl, ErrorScreen, Service } from "@hex-labs/core";
import OneSignal from "react-onesignal";
import * as OneSignalAPI from "@onesignal/node-onesignal";
import 'add-to-calendar-button'
import dateFormat from "dateformat";

import UpcomingEventsView from "./UpcomingEventsView";
import OngoingEventsView from "./OngoingEventsView";

const configuration = OneSignalAPI.createConfiguration({
  userKey: "NjYyMDlmYWQtOTMwMy00NTA3LTk4MjItOTQ5OGYzODA3MDc2",
  appKey: "OWRjMzIxMTktYmNlMi00MjE0LTk5NWQtYTdhYTdjYWU2YTBi",
});

const client = new OneSignalAPI.DefaultApi(configuration);

export async function createNotifOneSignal(name: any) {
  const notification = new OneSignalAPI.Notification();
  notification.app_id = "cd086e3e-0229-49b9-9cde-bfc98fb3fccb";

  notification.contents = {
    en: `${name} is starting right now!`,
  };
  notification.included_segments = ["Subscribed Users"];

  notification.headings = {
    en: "Event Starting!",
  };
  await client.createNotification(notification);
}

const Schedule: React.FC = () => {
  const curHexathon = process.env.REACT_APP_HEXATHON_ID;
  const [ongoingEvents, setOngoingEvents] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [eventsCalendar, setEventsCalendar] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/events"), {
          params: { hexathon: curHexathon },
        });

        if (res.data) {
          const curDate = new Date();
          const sortedData = res.data.sort((a: any, b: any) => {
            const startDateA = new Date(a.startDate);
            const startDateB = new Date(b.startDate);
            const endDateA = a.endDate ? new Date(a.endDate) : new Date(9999, 11, 31);
            const endDateB = b.endDate ? new Date(b.endDate) : new Date(9999, 11, 31);
            if (startDateA > startDateB) {
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
          });
          const filteredData = sortedData.filter(
            (event: any) => !event.endDate || new Date(event.endDate) >= curDate
          );
          const ongoing = filteredData.filter((event: any) => new Date(event.startDate) <= curDate);
          const upcoming = filteredData.filter((event: any) => new Date(event.startDate) > curDate);
          setOngoingEvents(ongoing);
          setUpcomingEvents(upcoming);
        }
      } catch (e: any) {
        setError(e);
      }
      setLoading(false);
    };

    document.title = "HexLabs Schedule";
    setLoading(true);
    getData();
  }, [curHexathon]);

  useEffect(() => {
    const refreshData = setInterval(() => {
      const curDate = new Date(new Date().valueOf());
      const temp = [...upcomingEvents];
      setUpcomingEvents(data => data.filter((event: any) => new Date(event.startDate) > curDate));
      setOngoingEvents(data =>
        data
          .filter((event: any) => !event.endDate || new Date(event.endDate) >= curDate) 
          .concat(temp.filter((event: any) => new Date(event.startDate) <= curDate))
      );

      upcomingEvents.forEach(ev => {
        const timeDif = (new Date(ev.startDate).getTime() - curDate.getTime()) / 1000;
        if (timeDif <= 1 && timeDif >= 0) {
          createNotifOneSignal(ev.name);
        }
      });
      const eventsForCalendarOngoing = ongoingEvents.map((event)=>({
        "name": event.name,
        "description": event.description,
        "endDate": event.endDate ? dateFormat(event.endDate, 'yyyy-mm-dd') : "",
        "startDate": dateFormat(event.startDate, 'yyyy-mm-dd'),
        "startTime": dateFormat(event.startDate, 'HH:MM'), 
        "endTime": event.endDate ? dateFormat(event.endDate, 'HH:MM') : "",
        "location": event.location.map((location: any) => location.name).join(" | "),
      }));

      console.log("ongoing", eventsForCalendarOngoing);

      const eventsForCalendarUpcoming = upcomingEvents.map((event)=>({
        "name":event.name,
        "description":event.description,
        "endDate": event.endDate ? dateFormat(event.endDate, 'yyyy-mm-dd') : "",
        "startDate": dateFormat(event.startDate, 'yyyy-mm-dd'),
        "startTime": dateFormat(event.startDate, 'HH:MM'), 
        "endTime": event.endDate ? dateFormat(event.endDate, 'HH:MM') : "",
        "location": event.location.map((location: any) => location.name).join(" | "),
      }));

      const eventsForCalendar = [...eventsForCalendarOngoing, ...eventsForCalendarUpcoming];

      setEventsCalendar(JSON.stringify(eventsForCalendar));
      console.log(JSON.stringify(eventsForCalendar));

    }, 1000);
    
    return () => clearInterval(refreshData);
  }, [ongoingEvents, upcomingEvents]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <HStack
        margin="auto"
        marginTop="20px"
        marginBottom="20px"
        width={{
          base: "90%",
          md: "80%",
        }}
      >
        <Spacer />
      </HStack>
      <Stack margin="auto" alignItems="end"
        width={{
          base: "95%",
          md: "85%",
        }}>
        <add-to-calendar-button
          name={process.env.REACT_APP_EVENT_NAME}
          dates={eventsCalendar}
          timeZone="America/New_York"
          options="'Apple','Google','iCal','Outlook.com','Yahoo'"
          lightMode="bodyScheme"
          listStyle="dropdown"
          buttonStyle="text"
        />
      </Stack>
      <Stack
        margin="auto"
        spacing="10px"
        paddingY="15px"
        width={{
          base: "95%",
          md: "85%",
        }}
        bg="#F5F6FA"
      >
        <OngoingEventsView events={ongoingEvents} loading={loading} />
        <UpcomingEventsView events={upcomingEvents} loading={loading} />
      </Stack>
    </>
  );
};

export default Schedule;
