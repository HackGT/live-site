import '../App.css';

import React, { useEffect, useRef } from 'react';

import DailyIframe from '@daily-co/daily-js';
import MainStageInformation from './MainStageInformation'
import EventInformation from './EventInformation';

type Props = {
  videoID: string;
  event: EventInformation;
};

const DailyStage: React.FC<Props> = (props: Props) => {

  const containerRef = useRef(null)

  async function createCallFrameAndJoinCall() {
    if (containerRef !== null) {
      const divElement = containerRef.current;
      if (divElement !== null) {
        const callFrame = DailyIframe.createFrame(divElement, {
          showLeaveButton: true,
          showFullscreenButton: true,
          theme: {
            colors: {
              accent: '#286DA8',
              accentText: '#FFFFFF',
              background: '#FFFFFF',
              backgroundAccent: '#FBFCFD',
              baseText: '#000000',
              border: '#EBEFF4',
              mainAreaBg: '#000000',
              mainAreaBgAccent: '#333333',
              mainAreaText: '#FFFFFF',
              supportiveText: '#808080',
            }
          }
        });
        await callFrame.join({
          url: props.videoID,
        });
      }
    }
  }

  useEffect(() => {
    createCallFrameAndJoinCall()
  }, [containerRef]);

  return (
    <div className="main_stage_container">
      <div className="main_stage_wrapper">
        <div className="dailyStage" ref={containerRef} />
      </div>
      <MainStageInformation event={props.event} />
    </div>
  );

}

export default DailyStage;
