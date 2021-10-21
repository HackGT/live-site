import '../App.css';

import Schedule from './Schedule';

const ScheduleTab: React.FC = () => {

  return (
    <div style={{height: window.innerHeight}}>
        <Schedule tableLength={Infinity} homepage={false}/>
    </div>
  )
}

export default ScheduleTab;
