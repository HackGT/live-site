import '../App.css';

import YouTube from "react-youtube";
import MainStageInformation from './MainStageInformation'
import EventInformation from './EventInformation';

type Props = {
  videoID: string;
  event: EventInformation;
};

const YoutubeStage: React.FC<Props> = (props: Props) => {

  return (
    <div className="main_stage_container">
      <div className="main_stage_wrapper_youtube">
        <YouTube
          videoId={props.videoID}
          opts={{ playerVars: { autoplay: 1, fs: 1, modestbranding: 1 } }}
          className="youtubeStage"
        />
        <iframe className="youtubechat" height="100%" src={"https://www.youtube.com/live_chat?v=" + props.videoID + "&embed_domain=" + window.location.hostname}></iframe>
      </div>
      <MainStageInformation event={props.event} />
    </div>
  )
}

export default YoutubeStage;
