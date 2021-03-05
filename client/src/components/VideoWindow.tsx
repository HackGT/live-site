import React, { useEffect, useState } from 'react';
import YoutubeWrapper from './YoutubeWrapper';
import CountdownTimer from './Countdown';
import {useParams} from "react-router-dom";
import {getEventUrl} from '../services/cmsService';


import "../App.css";

const VideoWindow: React.FC = () => {
  let params: any = useParams();
  let eventID: string = params.id;
  const [videoType, setVideoType] = useState<string>("");
  const [videoID, setVideoID] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [timeBeforeStart, setTimeBeforeStart] = useState<any>({});

  useEffect(() => {
    const fetchEventUrl = async () => {
      try {
        let eventData = await getEventUrl(eventID);
        setTimeBeforeStart(eventData.timebeforestart);
        setEventName(eventData.name);
        setStatus(eventData.status);
        let eventUrl: string = eventData.url;
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
            setVideoType("bluejeans")
            setVideoID(eventUrl)
          }
        }

      } catch (e) {
        console.log(e)

      }
    };
    fetchEventUrl();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Use ID 5f81edd0c14e740022589677 for testing!
  if (status === "eventInSession") {
    if (videoType === "youtube") {
      return (
        <div>
          <h1 className="Video-title">{eventName}</h1>
          <YoutubeWrapper videoID={videoID} />
        </div>
      );
    } else if (videoType === "bluejeans") {
      return (
        <div>
          <h1 className="Video-title">{eventName}</h1>
          <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="1200"
            height="750"
            src={videoID}
            allow="camera; microphone"
          ></iframe>
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
          <CountdownTimer remainingHours={timeBeforeStart.hours} remainingMinutes={timeBeforeStart.minutes} remainingSeconds={timeBeforeStart.seconds}/>
          <form action="https://2020.hack.gt/">
              <input className="Schedule-button" type="submit" value="Return to Schedule"/>
          </form>
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
};

export default VideoWindow;
