import React from "react";
import YouTube from "react-youtube";

import MainStageInformation from "./MainStageInformation";
import EventInformation from "../EventInformation";

type Props = {
  videoID: string;
  event: EventInformation;
};

const YoutubeStage: React.FC<Props> = (props: Props) => (
  <div className="main_stage_container">
    Youtube
    {/* <div className="main_stage_wrapper_youtube">
      <YouTube
        videoId={props.videoID}
        opts={{ playerVars: { autoplay: 0 } }}
        className="youtubeStage"
      />
      <iframe
        className="youtubechat"
        height="100%"
        src={`https://www.youtube.com/live_chat?v=${props.videoID}&embed_domain=${window.location.hostname}`}
      />
    </div>
    <MainStageInformation event={props.event} /> */}
  </div>
);

export default YoutubeStage;
