import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@chakra-ui/react";
import MediaQuery from "react-responsive";
import HamburgerMenu from "react-hamburger-menu";

import Logo from "./Logo";
import { routes } from "./Navigation";

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px 30px"
        boxShadow="0 3px 4px 0 rgb(0 0 0 / 8%)"
      >
        <Logo />
        <MediaQuery minWidth={1100}>
          <div>
            {routes.map(route => (
              <Link
                as={RouterLink}
                to={route.link}
                color="textPrimary"
                pl="40px"
                _focus={{ boxShadow: "none" }}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={1100}>
          <Box>
            <HamburgerMenu
              isOpen={showNavbar}
              menuClicked={() => setShowNavbar(!showNavbar)}
              color="black"
              strokeWidth={3}
            />
          </Box>
        </MediaQuery>
      </Box>
      {showNavbar && (
        <Box display="flex" flexDirection="column">
          {routes.map(route => (
            <Link
              key={route.name}
              as={RouterLink}
              to={route.link}
              color="textPrimary"
              _focus={{ boxShadow: "none" }}
              mt="20px"
            >
              {route.name}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
