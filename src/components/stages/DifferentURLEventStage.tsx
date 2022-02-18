import React from "react";

import MainStageInformation from "./MainStageInformation";
import EventInformation from "../EventInformation";

type Props = {
  eventName: string;
  event: EventInformation;
};

const DifferentURLEventStage: React.FC<Props> = (props: Props) => {
  if (props.event.url.includes("http")) {
    return (
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
            <h1 style={{ fontSize: "30px", color: "white" }}>
              Event will be held on a different webpage. Please click{" "}
              <a className="hello" href={props.event.url} target="_blank" rel="noreferrer">
                here
              </a>{" "}
            </h1>
          </div>
          <MainStageInformation event={props.event} />
        </div>
      </div>
    );
  }
  const newval = `https://${props.event.url}`;

  return (
    <div>
      <div className="main_stage_container">
        <div
          style={{
            backgroundColor: "#0C1735",
            width: "100%",
            height: "90%",
            padding: "25%",
          }}
        >
          <h1 style={{ fontSize: "35px", color: "white" }}>
            Event will be held on a different webpage. Please click{" "}
            <a className="hello" href={newval} target="_blank" rel="noreferrer">
              here
            </a>{" "}
          </h1>
        </div>
        <MainStageInformation event={props.event} />
      </div>
    </div>
  );
};

export default DifferentURLEventStage;
