import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import {useParams} from "react-router-dom";
import {getEventUrl} from '../services/cmsService';


function _get_state_text(state: any) {
  if (state === 0) {
    return "ended";
  } else if (state === 1) {
    return "playing"
  } else if (state === 2) {
    return "paused"
  } else if (state === 3) {
    return "buffering"
  } else if (state === 5) {
    return "video cued"
  } else if (state === -1) {
    return "unstarted"
  } 
  return "unknown"
}

const YoutubeWrapper: React.FC = () => {

  let params: any = useParams(); // TODO handle type of video
  let eventID: string = params.id;
  let eventUrl: string = ""
  let youtubeVideoID: string = ""

  useEffect(() => {
    const fetchIdeas = async () => {
      eventUrl = await getEventUrl(eventID);
      youtubeVideoID = "QH2-TGUlwu4"
    };
    fetchIdeas();
  }, []);

  const [isMuted, setIsMuted] = useState<String>('');
  const [playerState, setPlayerState] = useState<String>('');

  function _onChange(event: any) {
    let player_state = _get_state_text(event.data)
    let is_muted = String(event.target.isMuted())

    setIsMuted(is_muted);
    setPlayerState(player_state);
  }

  return (
    <div>
      <YouTube videoId={youtubeVideoID} opts={{height: '390', width: '640', playerVars: {autoplay: 1,}}} onStateChange={_onChange}/>
      <div>
        Player State: {playerState}
      </div>
      <div>
        Is Muted: {isMuted}
      </div>
    </div>
  )
  }

export default YoutubeWrapper;
