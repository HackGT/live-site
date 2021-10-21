import '../App.css';

import Schedule from './Schedule';

const ScheduleTab: React.FC = () => {

  return (
    <div>
        <Schedule tableLength={Infinity} homepage={false}/>
    </div>
  )
}

export default ScheduleTab;
