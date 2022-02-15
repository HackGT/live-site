import React, { useEffect, useRef } from "react";

import DailyIframe from "@daily-co/daily-js";
import MainStageInformation from "./MainStageInformation";
import EventInformation from "../EventInformation";

type Props = {
  videoID: string;
  event: EventInformation;
};

const DailyStage: React.FC<Props> = (props: Props) => {
  let url = props.videoID.split("?t=")[0];
  let token = props.videoID.split("?t=")[1];

  const containerRef = useRef<HTMLDivElement>(null);

  async function createCallFrameAndJoinCall() {
    if (containerRef.current !== null) {
      const divElement = containerRef.current;
      if (divElement !== null) {
        const callFrame = DailyIframe.createFrame(divElement, {
          showLeaveButton: true,
          showFullscreenButton: true,
          theme: {
            colors: {
              accent: "#286DA8",
              accentText: "#FFFFFF",
              background: "#FFFFFF",
              backgroundAccent: "#FBFCFD",
              baseText: "#000000",
              border: "#EBEFF4",
              mainAreaBg: "#000000",
              mainAreaBgAccent: "#333333",
              mainAreaText: "#FFFFFF",
              supportiveText: "#808080",
            },
          },
        });
        await callFrame.join({
          url: url,
          token: token,
        });
        callFrame.on("left-meeting", (_) => {
          if (containerRef != null) {
            if (containerRef.current != null) {
              containerRef.current.innerHTML = "";
            }
          }
          createCallFrameAndJoinCall();
        });
      }
    }
  }

  useEffect(() => {
    if (containerRef != null) {
      if (containerRef.current != null) {
        containerRef.current.innerHTML = "";
      }
    }
    createCallFrameAndJoinCall();
  }, [props.videoID]);

  return (
    <div className="main_stage_container">
      <div className="main_stage_wrapper">
        <div className="dailyStage" ref={containerRef} />
      </div>
      <MainStageInformation event={props.event} />
    </div>
  );
};

export default DailyStage;
