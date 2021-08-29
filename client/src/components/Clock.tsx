import CountdownBox from './CountdownBox'

import '../App.css';

type Props = {
  minutes: number;
  hours: number;
  seconds: number;
};

const Clock: React.FC<Props> = (props: Props) => {

  let minutesString: string = String(props.minutes < 10 ? `0${ props.minutes }` : props.minutes)
  let hoursString: string = String(props.hours < 10 ? `0${ props.hours }` : props.hours)
  let secondsString: string = String(props.seconds < 10 ? `0${ props.seconds }` : props.seconds)
    
  return (
    <div >
      <div className="ClockContainer">
        <div className="ClockInnerContainer">
          <div className="ClockDigits">
            <CountdownBox val={hoursString[0]}/>
            <CountdownBox val={hoursString[1]}/>
          </div>
          <h1 className="ClockLabelText">hours</h1>
        </div>
        <div>
          <div className="ClockColon">
            <div className="ColonBalls"/>
            <div className="ColonBalls"/>
          </div>
        </div>
        <div className="ClockInnerContainer">
          <div className="ClockDigits">
            <CountdownBox val={minutesString[0]}/>
            <CountdownBox val={minutesString[1]}/>
          </div>
          <h1 className="ClockLabelText">minutes</h1>
        </div>
        <div>
          <div className="ClockColon">
            <div className="ColonBalls"/>
            <div className="ColonBalls"/>
          </div>
        </div>
        <div className="ClockInnerContainer">
          <div className="ClockDigits">
            <CountdownBox val={secondsString[0]}/>
            <CountdownBox val={secondsString[1]}/>
          </div>
          <h1 className="ClockLabelText">seconds</h1>
        </div>
      </div>
    </div>
  )
}

export default Clock;