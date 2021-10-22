import '../App.css';

import MainStageInformation from './MainStageInformation';
import EventInformation from './EventInformation';
import React, { useState, useEffect } from 'react';

type Props = {
  startDate: Date; 
  event: EventInformation;
};

const CountDownEventStage: React.FC<Props> = (props: Props) => {

  const [timeLeft, setTimeLeft] = useState("")

  function updateTimer() {
    let delta = new Date((props.startDate.getTime() - new Date().getTime()));
    setTimeLeft(String(delta.toISOString().substring(11, 19)))
  }

  useEffect(() => {
    setInterval(updateTimer, 1000);
  }, []);

  return (
    <div>
        <div className="main_stage_container">
            <div style={{
                  backgroundColor: '#808080',
                  width: '100%',
                  height: '100%',
                  padding: '25%',
                }}>
              <h1 style={{fontSize: '24px', color:'white'}}>Event hasn't started yet...come back later!</h1>
              <h1 style={{fontSize: '64px', color:'white'}}>{timeLeft}</h1>
            </div>
            <MainStageInformation event={props.event} />
        </div>
    </div>
  )
}

export default CountDownEventStage;
