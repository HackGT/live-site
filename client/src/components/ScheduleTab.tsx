import '../App.css';

import Schedule from './Schedule';

type Props = {
  virtual: boolean;
};

const ScheduleTab: React.FC<Props> = (props: Props) => {

// const ScheduleTab: React.FC = () => {

  return (
    <div>
        <Schedule tableLength={Infinity} homepage={false} virtual={props.virtual}/>
    </div>
  )
}

export default ScheduleTab;
