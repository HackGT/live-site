import MainStageInformation from "./MainStageInformation";
import EventInformation from "../EventInformation";
import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";

type Props = {
  startDate: Date;
  event: EventInformation;
};

const CountDownEventStage: React.FC<Props> = (props: Props) => {
  const [timeLeft, setTimeLeft] = useState("");

  function updateTimer() {
    let now = new Date();
    if (now >= props.startDate) {
      window.location.reload();
    }
    let delta = new Date(props.startDate.getTime() - now.getTime());
    setTimeLeft(String(delta.toISOString().substring(11, 19)));
  }

  useEffect(() => {
    setInterval(updateTimer, 1000);
  }, []);

  return (
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
          <h1 style={{ fontSize: "24px", color: "white" }}>
            Event hasn't started yet...come back later!
          </h1>
          <h1 style={{ fontSize: "64px", color: "white" }}>{timeLeft}</h1>
          <Link
            className="navbar_link"
            color="textPrimary"
            href="https://game.hack.gt/"
          >
            <p style={{ fontSize: "24px", color: "white" }}>
              Play a game while you wait!
            </p>
          </Link>
        </div>
        <MainStageInformation event={props.event} />
      </div>
    </div>
  );
};

export default CountDownEventStage;
