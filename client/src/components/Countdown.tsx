import React, { useEffect, useState } from 'react';
import Clock from './Clock'

type Props = {
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
};

const CountdownTimer: React.FC<Props> = (props: Props) => {

  const [state, setState] = useState({
    hours: props.remainingHours,
    minutes: props.remainingMinutes,
    seconds: props.remainingSeconds
  });

  useEffect(() => {
    const i = setInterval(() => updateTime(), 1000);
    return () => clearInterval(i);
  });

  const updateTime = () => {
    if (state.seconds > 0) {
      setState({ hours: state.hours, minutes: state.minutes, seconds: state.seconds - 1})
    }
    else if (state.minutes > 0) {
      setState({ hours: state.hours, minutes: state.minutes - 1, seconds: 59})
    }
    else if (state.hours > 0) {
      setState({ hours: state.hours - 1, minutes: 59, seconds: 59})
    }
    else {
      window.location.reload();
    }
  }

  return (
      <Clock minutes={state.minutes} hours={state.hours} seconds={state.seconds}/>
  )
}

export default CountdownTimer;
