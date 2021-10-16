  
import '../App.css';

import EventInformation from './EventInformation';
import React, { useEffect, useState } from 'react';
import {getEventUrl} from '../services/cmsService';
import YoutubeStage from './YoutubeStage';
import DailyStage from './DailyStage'
import InvalidEventStage from './InvalidEventStage'
import VideoInformation from './VideoInformation';

type Props = {
  event: EventInformation;
};

const MainStage: React.FC<Props> = (props: Props) => {
  const [videoInformation, setVideoInformation] = useState<VideoInformation>()

  useEffect(() => {
    const fetchEventUrl = async () => {
      try {
        let eventData = await getEventUrl(props.event.id);
        console.log(eventData)
        let eventUrl: string = eventData.url;

        let videoID: string = ""
        let videoType: string = ""
        let eventName: string = eventData.name;
        let eventStatus: string = eventData.status;
        
        if (eventData.url) {
          console.log(props.event.url)
          if (eventUrl.includes("youtube")) {
            // For https://www.youtube.com/watch?v=... format
            videoType = "youtube";
            videoID = eventUrl.split("v=").slice(-1)[0];
          } else if (eventUrl.includes("youtu.be")) {
            // For https://youtu.be/... format
            videoType = "youtube";
            videoID = eventUrl.split("/").slice(-1)[0];
          } else if (eventUrl.includes("daily")) {
            videoType = "daily"
            videoID = eventUrl
          } else {
            videoType = "none"
            videoID = ""
          }
        } else {
          videoType = "none"
          videoID = ""
        }
        setVideoInformation(new VideoInformation(videoType, videoID, eventStatus, eventName))
      } catch (e) {
        console.log(e);
      }
    };
    fetchEventUrl();
  }, [props.event]); // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: Add countdown logic for upcoming events + game link 

  if (videoInformation !== undefined && videoInformation !== null) {
    if (videoInformation.status === "eventInSession") {
      if (videoInformation.type === "youtube") {
        return (
          <YoutubeStage event={props.event} videoID={videoInformation.url} />
        )
      } else if (videoInformation.type === "daily") {
        return (
          <DailyStage event={props.event} videoID={videoInformation.url} />
        )
      } else {
        return (
          <InvalidEventStage event={props.event} eventName={videoInformation.eventName} errorText="Unable to Load Event!" />
        )
      }
    } else if (videoInformation.status === "eventEnded") {
      return (
        <InvalidEventStage event={props.event} eventName={videoInformation.eventName} errorText="Event has ended!" />
      );
    } else if (videoInformation.status === "eventWithin24Hours") {
      return (
        <InvalidEventStage event={props.event} eventName={videoInformation.eventName} errorText="Event hasn't started yet...come back later!" />
      )
    } else if (videoInformation.status==="eventNotWithin24Hours"){
      return (
        <InvalidEventStage event={props.event} eventName={videoInformation.eventName} errorText="Event not in session!" />
      )
    } else {
      return (
        <InvalidEventStage event={props.event} eventName={videoInformation.eventName} errorText="" />
      )
    }
  } else {
    return (
      <div/>
    )
  }
};

export default MainStage;
