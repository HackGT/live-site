import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import { Button, Link } from "@chakra-ui/react";
import MediaQuery from "react-responsive";
import HamburgerNavbar from "./HamburgerNavbar";
import custom_theme from "../Theme";

const Navbar: React.FC = () => {
  let location: any = useLocation()?.pathname;

  const ButtonStyle = {
    background: custom_theme.palette.primary.main,
    borderRadius: 5,
    border: 0,
    color: "white",
    height: "48px",
    fontSize: "16px",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    textTransform: "capitalize",
  };

  return (
    <div>
      <MediaQuery minWidth={1100}>
        <div className="navbar">
          <div>
            <Logo />
          </div>
          <div className="navbar_right">
            <Link className="navbar_link" color="textPrimary" href="/">
              <p
                className={
                  location === "/"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Home
              </p>
            </Link>
            <Link className="navbar_link" color="textPrimary" href="/schedule">
              <p
                className={
                  location === "/schedule"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Schedule
              </p>
            </Link>
            <Link className="navbar_link" color="textPrimary" href="/tracks">
              <p
                className={
                  location === "/tracks"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Tracks
              </p>
            </Link>
            <Link className="navbar_link" color="textPrimary" href="/mentors">
              <p
                className={
                  location === "/mentors"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Mentors
              </p>
            </Link>
            <Link className="navbar_link" color="textPrimary" href="/sponsors">
              <p
                className={
                  location === "/sponsors"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Sponsors
              </p>
            </Link>
            <Link className="navbar_link" color="textPrimary" href="/prizes">
              <p
                className={
                  location === "/prizes"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Prizes
              </p>
            </Link>
            <Link className="navbar_link" color="textPrimary" href="/info">
              <p
                className={
                  location === "/info"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Info
              </p>
            </Link>
            <Link
              className="navbar_link"
              color="textPrimary"
              href="https://game.hack.gt/"
            >
              <p
                className={
                  location === "/info"
                    ? "navbar_link_text_bold"
                    : "navbar_link_text"
                }
              >
                Game
              </p>
            </Link>
            <div className="navbar_button">
              <Button
                sx={ButtonStyle}
                variant="outlined"
                color="primary"
                as={Link}
                href="https://join.hack.gt"
              >
                Discord
              </Button>
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
