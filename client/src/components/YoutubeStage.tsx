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
      <div className="main_stage_wrapper">
        <YouTube
          videoId={props.videoID}
          opts={{ playerVars: { autoplay: 1 } }}
          className="youtubeStage"
        /> 
      </div>
      <MainStageInformation event={props.event} />
    </div>
  )
}

export default YoutubeStage;