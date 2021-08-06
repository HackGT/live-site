import '../App.css';

import MainStage from './MainStage';
import LiveEvents from './LiveEvents'
import Schedule from './Schedule'
import UpcomingEvents from './UpcomingEvents'
import AllEvents from './AllEvents'

const Home: React.FC = () => {

  return (
    <div>
        <MainStage />
        <LiveEvents />
        <Schedule />
        <UpcomingEvents />
        <AllEvents />
    </div>
  )
}

export default Home;
