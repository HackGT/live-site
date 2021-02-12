import React from 'react';
import YouTube from 'react-youtube';

function _get_state_text(state) {
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

class Example extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this)
    this.state = {isMuted: "false", playerState: "unstarted"};
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  _onChange(event) {
    let player_state = _get_state_text(event.data)
    let is_muted = String(event.target.isMuted())

    this.setState({
      playerState: player_state,
      isMuted:is_muted
    })
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    
    return <div>
      <YouTube videoId="Wf7YRpiQiVM" opts={opts} onReady={this._onReady} onStateChange={this._onChange}/>
      <div>
        Player State: {this.state.playerState}
      </div>
      <div>
        Is Muted: {this.state.isMuted}
      </div>
    </div>
  }
}

export default Example
