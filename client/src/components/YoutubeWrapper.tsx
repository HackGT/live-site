import React, { useState } from 'react';
import YouTube from 'react-youtube';

function _get_state_text(state: any) {
  if (state == 0) {
    return "ended";
  } else if (state == 1) {
    return "playing"
  } else if (state == 2) {
    return "paused"
  } else if (state == 3) {
    return "buffering"
  } else if (state == 5) {
    return "video cued"
  } else if (state == -1) {
    return "unstarted"
  } 
  return "unknown"
}


const YoutubeWrapper: React.FC = () => {

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
      <YouTube videoId="QH2-TGUlwu4" opts={{height: '390', width: '640', playerVars: {autoplay: 1,}}} onStateChange={_onChange}/>
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
