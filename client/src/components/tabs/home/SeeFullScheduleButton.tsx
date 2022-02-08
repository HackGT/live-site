import React from "react";
import {Link as ReactRouterLink } from "react-router-dom"

import { Button } from "@chakra-ui/react";

import custom_theme from "../../Theme";

const SeeFullScheduleButton: React.FC = () => {
  const ButtonStyle = {
    bg: custom_theme.palette.primary.main,
    borderRadius: 5,
    border: 0,
    textTransform: "capitalize",
    color: "white",
    height: "48px",
    fontSize: "16px",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  }

  return (
    <div>
      <Button
        sx={ButtonStyle}
        className="upcoming_events_button"
        variant="contained"
        color="primary"
        as={ReactRouterLink}
        to="/schedule"
      >
        See Full Schedule
      </Button>
    </div>
  );
};

export default SeeFullScheduleButton;
