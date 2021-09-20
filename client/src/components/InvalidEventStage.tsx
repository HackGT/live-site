import '../App.css';

import MainStageInformation from './MainStageInformation'
import EventInformation from './EventInformation';

type Props = {
  eventName: string;
  errorText: string;
  event: EventInformation;
};

const InvalidEventStage: React.FC<Props> = (props: Props) => {
  return (
    <div>
        <div className="main_stage_container">
            <h1 className="Video-title">{props.eventName}</h1>
            <h1 className="Video-title">{props.errorText}</h1>
            <MainStageInformation event={props.event} />
        </div>
    </div>
  )
}

export default InvalidEventStage;
