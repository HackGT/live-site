  
import '../App.css';

import EventInformation from './EventInformation';
import MainStageInformation from './MainStageInformation'

import React, { useEffect, useState } from 'react';
import {getEventUrl} from '../services/cmsService';
import YouTube from "react-youtube";
import DailyIframe from '@daily-co/daily-js';


function getVideoSize() {
  return {
    'width': String(Math.floor(.85 * Math.max(window.innerWidth, document.body.clientWidth))),
    'height': String(Math.floor(.75 * Math.max(window.innerHeight, document.body.clientHeight)))
  }
} 

type Props = {
  event: EventInformation;
};

const MainStage: React.FC<Props> = (props: Props) => {
  const [videoType, setVideoType] = useState<string>("");
  const [videoID, setVideoID] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [videoSize, setVideoSize] = useState<any>(getVideoSize())

  useEffect(() => {
    const fetchEventUrl = async () => {
      try {
        let eventData = await getEventUrl(props.event.id);
        setEventName(eventData.name);
        setStatus(eventData.status);
        let eventUrl: string = eventData.url;
        if (props.event.url) {
          if (eventUrl.includes("youtube")) {
            // For https://www.youtube.com/watch?v=5qap5aO4i9A format
            setVideoType("youtube");
            setVideoID(eventUrl.split("v=").slice(-1)[0]);
          } else if (eventUrl.includes("youtu.be")) {
            // For https://youtu.be/xw_PEnX7T_4 format
            setVideoType("youtube");
            setVideoID(eventUrl
              .split("/").slice(-1)[0]);
          } else if (eventUrl.includes("daily")) {
            setVideoType("daily");
            setVideoID(eventUrl);
          } else {
            window.location.href = eventUrl;
          }
        }
      } catch (e) {
        console.log(e);
      }
      setContentLoaded(true);
    };
    fetchEventUrl();
  }, [props.event]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const updateWindowDimensions = () => {
      setVideoSize(getVideoSize());
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  // TODO: Add countdown logic for upcoming events + game link 

  if (contentLoaded === true) {
    if (status === "eventInSession") {
      if (videoType === "youtube") {
        return (
          <div>
          <div className="main_stage_container">
            <YouTube
                videoId={videoID}
                opts={{ height: videoSize.height, width: videoSize.width, playerVars: { autoplay: 1 } }}
              /> 
            {/* <a href={props.event.url} className="RedirectURL">click here if the stream won't load</a> */}
            <MainStageInformation event={props.event} />
          </div>
        </div>
    
        );
      } else if (videoType === "daily") {
        
        var callFrame = DailyIframe.createFrame({
          showLeaveButton: true,
          showFullscreenButton: true
        });
        callFrame.setTheme({
          colors: {
            accent: '#286DA8',
            accentText: '#FFFFFF',
            background: '#FFFFFF',
            backgroundAccent: '#FBFCFD',
            baseText: '#000000',
            border: '#EBEFF4',
            mainAreaBg: '#000000',
            mainAreaBgAccent: '#333333',
            mainAreaText: '#FFFFFF',
            supportiveText: '#808080',
          }
        });

        callFrame.on('left-meeting', () => {
          let currentTime = new Date();
          let data = {"endDate": currentTime.toString(), "EventID": props.event.id }
          fetch('http://localhost:3000/user/updateEnd', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(data => {
            console.log('success', data)
          }).catch(error => {
            console.error('Error:', error);
          });

        });
        callFrame.join({
          url: videoID,
        })

        return (
          <div>
            {/* <h1 className="Video-title"> {eventName}</h1> */}
            <div className="main_stage_container">
            <MainStageInformation event={props.event} />
            </div>
          </div>
        );
        } else {
        return <div />;
      }
    } else if (status === "eventEnded") {
      return (
        <div>
          <div className="main_stage_container">
            <h1 className="Video-title">{eventName}</h1>
            <h1 className="Video-title">Event has Ended!!</h1>
            <MainStageInformation event={props.event} />
          </div>
        </div>
      );
    } else if (status === "eventWithin24Hours") {
      return (
        <div>
          <div className="Timer">
            <div className="main_stage_container">
            <h1 className="Video-title">{eventName}</h1>
            <h1 className="Video-title">You are too early! Come back in:</h1>
            <MainStageInformation event={props.event} />
            </div>
          </div>
        </div>
        )
    } else if (status==="eventNotWithin24Hours"){
      return (
        <div>
          <div className="main_stage_container">
            <h1 className="Video-title">{eventName}</h1>
            <h1 className="Video-title">Event not in Session!!</h1>
            <MainStageInformation event={props.event} />
        </div>
      </div>
      )
    } else {
      return (
        <div>
          <div className="main_stage_container">
            <div className="main_stage_placeholder">{props.event.url}</div>
            <h1 className="Video-title">{eventName}</h1>
            <MainStageInformation event={props.event} />
        </div>
      </div>
      )
    }
  } else {
    return (
      <div/>
    )
  }
};


export default MainStage;