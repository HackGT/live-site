import React, { useEffect, useState } from 'react';
import CountdownTimer from './Countdown';
import {useParams} from "react-router-dom";
import {getEventUrl} from '../services/cmsService';
import YouTube from "react-youtube";

import "../App.css";

function getStartTime(h: number, m: number, s: number) {
  const remainingTimeMS: number = s * 1000 + m * 60 * 1000 + h * 60 * 60 * 1000;
  return new Date().getTime() + remainingTimeMS;
}

function getVideoSize() {
  return {
    'width': String(Math.floor(.85 * Math.max(window.innerWidth, document.body.clientWidth))),
    'height': String(Math.floor(.75 * Math.max(window.innerHeight, document.body.clientHeight)))
  }
} 

const VideoWindow: React.FC = () => {
  let params: any = useParams();
  let eventID: string = params.id;
  const [videoType, setVideoType] = useState<string>("");
  const [videoID, setVideoID] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [timeBeforeStart, setTimeBeforeStart] = useState<any>({});
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [videoSize, setVideoSize] = useState<any>(getVideoSize())
  const [eventUrl, setEventUrl] = useState<string>("")

  useEffect(() => {
    const fetchEventUrl = async () => {
      try {
        let eventData = await getEventUrl(eventID);
        setTimeBeforeStart(eventData.timebeforestart);
        setEventName(eventData.name);
        setStatus(eventData.status);
        let eventUrl: string = eventData.url;
        setEventUrl(eventUrl);
        if (eventData.url) {
          if (eventUrl.includes("youtube")) {
            // For https://www.youtube.com/watch?v=5qap5aO4i9A format
            setVideoType("youtube");
            setVideoID(eventUrl.split("v=").slice(-1)[0]);
          } else if (eventUrl.includes("youtu.be")) {
            // For https://youtu.be/xw_PEnX7T_4 format
            setVideoType("youtube");
            setVideoID(eventUrl.split("/").slice(-1)[0]);
          } else if (eventUrl.includes("bluejeans")) {
            setVideoType("bluejeans");
            setVideoID(eventUrl);
          }
        }
      } catch (e) {
        console.log(e);
      }
      setContentLoaded(true);
    };
    fetchEventUrl();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    const updateWindowDimensions = () => {
      setVideoSize(getVideoSize());
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  // Use ID 5f81edd0c14e740022589677 for testing!
  if (contentLoaded === true) {
    if (status === "eventInSession") {
      if (videoType === "youtube") {
        return (
          <div>
            <h1 className="Video-title">{eventName}</h1>
            <YouTube
              videoId={videoID}
              opts={{ height: videoSize.height, width: videoSize.width, playerVars: { autoplay: 1 } }}
            /> 
            <a href={eventUrl} className="RedirectURL">click here if the stream won't load</a>
          </div>
        );
      } else if (videoType === "bluejeans") {
        return (
          <div>
            <h1 className="Video-title">{eventName}</h1>
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              width={videoSize.width}
              height={videoSize.height}
              src={videoID}
              allow="camera; microphone"/>
            <a href={eventUrl} className="RedirectURL">click here if the stream won't load</a>
          </div>
        );
      } else {
        return <div />;
      }
    } else if (status === "eventEnded") {
      return (
        <div>
          <h1 className="Video-title">{eventName}</h1>
          <h1 className="Video-title">Event has Ended!!</h1>
        </div>
      );
    } else if (status === "eventWithin24Hours") {
      return (
        <div>
          <div className="Timer">
            <h1 className="Video-title">{eventName}</h1>
            <h1 className="Video-title">You are too early! Come back in:</h1>
            <CountdownTimer startTime={getStartTime(timeBeforeStart.hours, timeBeforeStart.minutes, timeBeforeStart.seconds)}/>
            <a className="Schedule-button" href="https://2020.hack.gt">Return to Schedule</a>
          </div>
        </div>
        )
    } else if (status==="eventNotWithin24Hours"){
      return (
        <div>
          <h1 className="Video-title">{eventName}</h1>
          <h1 className="Video-title">Event not in Session!!</h1>
      </div>
      )
    } else {
      return (
        <div>
            <h1 className="Video-title">Oops! Seems like the page you're looking for doesn't exist.</h1>
        </div>
      )
    }
  } else {
    return (
      <div/>
    )
  }
};

export default VideoWindow;
