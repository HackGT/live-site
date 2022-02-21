import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { useLocation } from "react-router-dom";
import { Box, Link, Button, Text } from "@chakra-ui/react";

import Logo from "./Logo";

const HamburgerNavbar: React.FC = () => {
  const location: any = useLocation()?.pathname;
  const [state, setState] = useState(false);

  return (
    <Box className="navbar">
      <Box>
        <Logo />
      </Box>
      <Box className="navbar_right">
        <HamburgerMenu
          isOpen={state}
          menuClicked={() => setState(!state)}
          color="white"
          strokeWidth={3}
        />
      </Box>
      {state && (
        <Box className="hamNavbar">
          <Link className="navbar_link" color="textPrimary" href="/">
            <p className={location === "/" ? "navbar_link_text_bold" : "navbar_link_text"}>Home</p>
          </Link>
          <Link className="navbar_link" color="textPrimary" href="/schedule">
            <p className={location === "/schedule" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Schedule
            </p>
          </Link>
          <Link className="navbar_link" color="textPrimary" href="/tracks">
            <p className={location === "/tracks" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Tracks
            </p>
          </Link>
          <Link className="navbar_link" color="textPrimary" href="/mentors">
            <p className={location === "/mentors" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Mentors
            </p>
          </Link>
          <Link className="navbar_link" color="textPrimary" href="/sponsors">
            <Text
              className={location === "/sponsors" ? "navbar_link_text_bold" : "navbar_link_text"}
            >
              Sponsors
            </Text>
          </Link>
          <Link className="navbar_link" color="textPrimary" href="/prizes">
            <Button
              className={location === "/prizes" ? "navbar_link_text_bold" : "navbar_link_text"}
              variant="outlined"
              colorScheme="red"
            >
              Prizes
            </Button>
          </Link>
          <Link className="navbar_link" color="textPrimary" href="/info">
            <Text className={location === "/info" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Info
            </Text>
          </Link>
          <Box className="navbar_button">
            <Button size="md" height="48px" width="200px" border="2px" borderColor="green.500">
              <Link href="join.hack.gt">Game</Link>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HamburgerNavbar;
