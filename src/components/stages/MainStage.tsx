import React, { useEffect, useState } from "react";

import EventInformation from "../EventInformation";
import { getEventUrl } from "../../services/cmsService";
import YoutubeStage from "./YoutubeStage";
import DailyStage from "./DailyStage";
import InvalidEventStage from "./InvalidEventStage";
import VideoInformation from "./VideoInformation";
import CountDownEventStage from "./CountDownEventStage";
import DifferentURLEventStage from "./DifferentURLEventStage";

type Props = {
  event: EventInformation;
  confirmed: boolean;
};

const MainStage: React.FC<Props> = (props: Props) => {
  const [videoInformation, setVideoInformation] = useState<VideoInformation>();
  const [startTime, setStartTime] = useState<number>(-1);

  function getTimeInMS(timebeforestart: any) {
    return (
      (timebeforestart.hours * 60 * 60 + timebeforestart.minutes * 60 + timebeforestart.seconds) *
      1000
    );
  }

  async function updateVideoData() {
    if (props.event.id) {
      try {
        const eventData = await getEventUrl(props.event.id);
        const eventUrl: string = eventData.url;

        let videoID = "";
        let videoType = "";
        const eventName: string = eventData.name;
        const eventStatus: string = eventData.status;

        const timeTillStartMS = getTimeInMS(eventData.timebeforestart);
        setStartTime(timeTillStartMS);

        if (eventData.url) {
          if (eventUrl.includes("youtube")) {
            // For https://www.youtube.com/watch?v=... format
            videoType = "youtube";
            [videoID] = eventUrl.split("v=").slice(-1);
          } else if (eventUrl.includes("youtu.be")) {
            // For https://youtu.be/... format
            videoType = "youtube";
            [videoID] = eventUrl.split("/").slice(-1);
          } else if (eventUrl.includes("daily")) {
            videoType = "daily";
            videoID = eventUrl;
          } else {
            videoType = "otherEvent";
            videoID = eventUrl;
          }
          if (timeTillStartMS > 0) {
            setTimeout(updateVideoData, timeTillStartMS);
          }
        } else {
          videoType = "none";
          videoID = "";
        }
        setVideoInformation(new VideoInformation(videoType, videoID, eventStatus, eventName));
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    updateVideoData();
  }, [props.event]); // eslint-disable-line react-hooks/exhaustive-deps

  if (props.event.title === "No Events are currently live!") {
    return (
      <InvalidEventStage
        event={props.event}
        eventName="No Events are currently live!"
        errorText="Check the schedule to see when the next event will go live!"
      />
    );
  }
  if (videoInformation !== undefined && videoInformation !== null) {
    if (videoInformation.status === "eventInSession") {
      if (videoInformation.type === "youtube") {
        return <YoutubeStage event={props.event} videoID={videoInformation.url} />;
      }
      if (videoInformation.type === "daily") {
        return <DailyStage event={props.event} videoID={videoInformation.url} />;
      }
      if (videoInformation.url) {
        return (
          <DifferentURLEventStage event={props.event} eventName={videoInformation.eventName} />
        );
      }
      return (
        <InvalidEventStage
          event={props.event}
          eventName={videoInformation.eventName}
          errorText="Unable to Load Event!"
        />
      );
    }
    if (videoInformation.status === "eventEnded") {
      return (
        <InvalidEventStage
          event={props.event}
          eventName={videoInformation.eventName}
          errorText="Event has ended!"
        />
      );
    }
    if (videoInformation.status === "eventWithin24Hours") {
      if (startTime !== -1) {
        const timerDate = new Date(Date.now() + startTime);
        return <CountDownEventStage event={props.event} startDate={timerDate} />;
      }
      return (
        <InvalidEventStage
          event={props.event}
          eventName={videoInformation.eventName}
          errorText="Event is starting soon!"
        />
      );
    }
    if (videoInformation.status === "eventNotWithin24Hours") {
      return (
        <InvalidEventStage
          event={props.event}
          eventName={videoInformation.eventName}
          errorText="Event not in session!"
        />
      );
    }
    return (
      <InvalidEventStage event={props.event} eventName={videoInformation.eventName} errorText="" />
    );
  }
  return <div />;
};

export default MainStage;
