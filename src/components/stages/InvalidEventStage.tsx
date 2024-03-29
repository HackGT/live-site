import React from "react";

import MainStageInformation from "./MainStageInformation";
import EventInformation from "../EventInformation";

type Props = {
  eventName: string;
  errorText: string;
  event: EventInformation;
};

const InvalidEventStage: React.FC<Props> = (props: Props) => (
  <div>
    <div className="main_stage_container">
      <div
        style={{
          backgroundColor: "#0C1735",
          width: "100%",
          height: "100%",
          padding: "25%",
        }}
      >
        <h1 style={{ fontSize: "30px", color: "white" }}>{props.errorText}</h1>
      </div>
      <MainStageInformation event={props.event} />
    </div>
  </div>
);

export default InvalidEventStage;
