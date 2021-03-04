import React, { useState } from 'react';
import Clock from './Clock'

type Props = {
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
};

const CountdownTimer: React.FC<Props> = (props: Props) => {

  const [timerHours, setTimerHours] = useState<number>(props.remainingHours);
  const [timerMinutes, setTimerMinutes] = useState<number>(props.remainingMinutes);
  const [timerSeconds, setTimerSeconds] = useState<number>(props.remainingSeconds);

  const interval = setInterval(function() {
    // This code will run every minute!
    console.log("HI");
    if (timerSeconds > 0) {
      setTimerSeconds(timerSeconds - 1);
    }
    else if (timerMinutes > 0) {
      setTimerMinutes(timerMinutes - 1);
      setTimerSeconds(59);
    }
    else if (timerHours > 0) {
      setTimerHours(timerHours - 1);
      setTimerMinutes(59);
      setTimerSeconds(59);
    }
    else {
      clearInterval(interval)
      window.location.reload();
    }
  }, 1000);

  return (
      <Clock minutes={timerMinutes} hours={timerHours} seconds={timerSeconds}/>
  )
}

export default CountdownTimer;
