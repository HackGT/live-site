import React from "react";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import { chakra, Button, Link } from "@chakra-ui/react";
import MediaQuery from "react-responsive";
import HamburgerNavbar from "./HamburgerNavbar";
import theme from "../Theme";

const Navbar: React.FC = () => {
  const location: any = useLocation()?.pathname;

  const StyledButton = chakra(Button, {
    baseStyle: {
      bg: theme.palette.primary.main,
      borderRadius: 5,
      border: 0,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      fontSize: "16px",
      padding: "16px 30px",
      textTransform: "capitalize",
      margin: "1px"
    },
  })

  const StyledLink = chakra(Link, {
    baseStyle: {
      _focus: {
        boxShadow: "0 0 0 0",
      }
    }
  })

  return (
    <div>
      <MediaQuery minWidth={1100}>
        <div className="navbar">
          <div>
            <Logo />
          </div>
          <div className="navbar_right">
            <StyledLink className="navbar_link" color="textPrimary" href="/">
              <p className={location === "/" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Home
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="/schedule">
              <p
                className={location === "/schedule" ? "navbar_link_text_bold" : "navbar_link_text"}
              >
                Schedule
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="/tracks">
              <p className={location === "/tracks" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Tracks
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="/mentors">
              <p className={location === "/mentors" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Mentors
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="/sponsors">
              <p
                className={location === "/sponsors" ? "navbar_link_text_bold" : "navbar_link_text"}
              >
                Sponsors
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="/prizes">
              <p className={location === "/prizes" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Prizes
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="/info">
              <p className={location === "/info" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Info
              </p>
            </StyledLink>
            <StyledLink className="navbar_link" color="textPrimary" href="https://game.hack.gt/">
              <p className={location === "/info" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Game
              </p>
            </StyledLink>
            <div className="navbar_button">
              <StyledButton
                _hover={{
                  bg: "#293b6e",
                  border: "1px",
                  borderColor: "#3f51b5",
                  textDecoration: "none",
                  margin: "0px"
                }}
                as={Link}
                href="https://join.hack.gt"
              >
                Discord
              </StyledButton>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1100}>
        <HamburgerNavbar />
      </MediaQuery>
    </div>
  );
};

export default Navbar;
