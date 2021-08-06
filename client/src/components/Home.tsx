import '../App.css';

import MainStage from './MainStage';
import LiveEvents from './LiveEvents'

const Home: React.FC = () => {

  return (
    <div>
        <MainStage />
        <LiveEvents />
    </div>
  )
}

export default Home;
