import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { chakra, Button } from "@chakra-ui/react";

import theme from "../../Theme";

const SeeFullScheduleButton: React.FC = () => {
  const StyledButton = chakra(Button, {
    baseStyle: {
      bg: theme.palette.primary.main,
      borderRadius: 5,
      border: 0,
      color: "white",
      fontSize: "16px",
      padding: "16px 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      textTransform: "capitalize",
    },
  });

  return (
    <div>
      <StyledButton
        className="upcoming_events_button"
        _hover={{
          bg: "#2f409f",
          boxShadow: "0px 3px 5px 2px rgba(0, 0, 0, 0.3)",
        }}
        as={ReactRouterLink}
        to="/schedule"
      >
        See Full Schedule
      </StyledButton>
    </div>
  );
};

export default SeeFullScheduleButton;
