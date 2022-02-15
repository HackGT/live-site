import React from "react";

import MainStageInformation from "./MainStageInformation";
import EventInformation from "../EventInformation";

type Props = {
  eventName: string;
  errorText: string;
  event: EventInformation;
};

const ValidEventStage: React.FC<Props> = (props: Props) => (
  <div>
    <div className="main_stage_container">
      <div
        style={{
          backgroundColor: "#808080",
          width: "100%",
          height: "100%",
          padding: "25%",
        }}
      >
        <h1 style={{ fontSize: "30px", color: "white" }}>
          Event will be held on a different webpage. Please click{" "}
          <a href={props.eventName} target="_blank" rel="noreferrer">
            here
          </a>{" "}
        </h1>
      </div>
      <MainStageInformation event={props.event} />
    </div>
  </div>
);

export default ValidEventStage;
