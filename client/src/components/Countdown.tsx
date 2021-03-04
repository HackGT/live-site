import React, { useState } from 'react';
import Clock from './Clock'

type Props = {
  remainingHours: number;
  remainingMinutes: number;
};

const CountdownTimer: React.FC<Props> = (props: Props) => {

  const [timerHours, setTimerHours] = useState<number>(props.remainingHours);
  const [timerMinutes, setTimerMinutes] = useState<number>(props.remainingMinutes);

  const interval = setInterval(function() {
    // This code will run every minute!
    if (timerMinutes > 0) {
      setTimerMinutes(timerMinutes - 1);
    }
    else if (timerHours > 0) {
      setTimerHours(timerHours - 1);
      setTimerMinutes(59)
    }
    else {
      clearInterval(interval)
      window.location.reload();
    }
  }, 60*1000);

  return (
      <Clock minutes={timerMinutes} hours={timerHours}/>
  )
}

export default CountdownTimer;
