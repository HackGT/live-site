import React, { useEffect, useState } from 'react';
import YoutubeWrapper from './YoutubeWrapper';
import {useParams} from "react-router-dom";
import {getEventUrl} from '../services/cmsService';

import '../App.css';

const VideoWindow: React.FC = () => {

  let params: any = useParams();
  let eventID: string = params.id;
  const [videoType, setVideoType] = useState<string>("");
  const [videoID, setVideoID] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");

  useEffect(() => {
    const fetchEventUrl = async () => {
      let eventData = await getEventUrl(eventID);
      console.log(eventData);

      setEventName(eventData.name);
      let eventUrl: string = eventData.url;
      if (eventUrl.includes("youtube")) {
          // For https://www.youtube.com/watch?v=5qap5aO4i9A format
        setVideoType("youtube");
        setVideoID(eventUrl.split("v=").slice(-1)[0]);
      } else if (eventUrl.includes("youtu.be")) {
        // For https://youtu.be/xw_PEnX7T_4 format
        setVideoType("youtube");
        setVideoID(eventUrl.split("/").slice(-1)[0]);
      }
    };
    fetchEventUrl();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Use ID 5f81edd0c14e740022589677 for testing!
  if (videoType === "youtube") {
    return (
      <div>
        <h1 className="Video-title">{eventName}</h1>
        <YoutubeWrapper videoID={videoID}/>
      </div>
    )
  } else {
    return <div/>
  }
}

export default VideoWindow;
