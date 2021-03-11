import React, { useEffect, useState } from 'react';
import Clock from './Clock'

type Props = {
  startTime: number
};

const CountdownTimer: React.FC<Props> = (props: Props) => {

  function getTimeDifference() {
    const currentTime = new Date().getTime()

    // get total seconds between the times
    let delta = Math.abs(props.startTime - currentTime) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    let seconds = Math.floor(delta % 60);

    return {
      seconds: seconds,
      minutes: minutes,
      hours: hours
    }
  }
  
  const [state, setState] = useState(getTimeDifference());

  useEffect(() => {
    const i = setInterval(() => updateTime(), 1000);
    return () => clearInterval(i);
  });

  const updateTime = () => {
    const currentTime = new Date().getTime()
    setState(getTimeDifference());
    if (currentTime >= props.startTime) {
      window.location.reload();
    }
  }

  return (
      <Clock minutes={state.minutes} hours={state.hours} seconds={state.seconds}/>
  )
}

export default CountdownTimer;
