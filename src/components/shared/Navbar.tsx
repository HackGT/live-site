/* eslint-disable */
import React from "react";
import { Link, chakra, Text, Box } from "@chakra-ui/react";
import { Header, HeaderItem, useAuth, Service, apiUrl, LoadingScreen, ErrorScreen } from "@hex-labs/core";
import axios from "axios";
import useAxios from "axios-hooks";
import { HEXATHON_ID } from "../../App";
import { routes } from "./Navigation";

const ChakraLink = chakra(Link, {
  baseStyle: {
    _hover: {
      textDecoration: "none",
    },
  },
});

const calculateTimeRemaining = (endTime: string): any => {
  const updateInterval = 1000;
  const endDateTime = new Date(endTime).getTime();

  const updateTimer = () => {
    const now = new Date().getTime();
    const timeRemaining = endDateTime - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (timeRemaining <= 0) {
      return "Complete";
    }
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  let timeRemaining = updateTimer();
  const remainingTimeElement = document.getElementById("remaining-time");
  if (remainingTimeElement) {
    remainingTimeElement.textContent = timeRemaining;
  }

  setInterval(() => {
    timeRemaining = updateTimer();
    if (remainingTimeElement) {
      remainingTimeElement.textContent = timeRemaining;
    }
  }, updateInterval);
};

interface timerProps {
  activeHexathon: any;
}

const Timer = (props: timerProps) => {
  const countdownTimerStyle = {
    fontFamily: "monospace",
    padding: "5px",
    border: "2px solid #333",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
  };
  const hexathonNameStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#8a2be2",
  };

  return (
    <>
        <HeaderItem key={props.activeHexathon.id}>
          <Box display="block">
            <Text style={hexathonNameStyle}>{props.activeHexathon.name}</Text>
            <Text textAlign="right">
              <span id="remaining-time" style={countdownTimerStyle}>
                {calculateTimeRemaining(props.activeHexathon.endDate)}
              </span>
            </Text>
          </Box>
        </HeaderItem>
    </>
  );
};

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const [role, setRoles] = React.useState<any>({
    member: false,
    exec: false,
    admin: false,
  });

  const [hexathons, setHexathons] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getRoles = async () => {
      if (user?.uid) {
        const response = await axios.get(apiUrl(Service.USERS, `/users/${user?.uid}`));
        setRoles({ ...response.data.roles });
      }
    };
    getRoles();
  }, [user?.uid]);

  const [{ data: activeHexathon, loading: hexathonLoading, error: hexathonError }] = useAxios(
    {
      url: apiUrl(Service.HEXATHONS, `/hexathons/${HEXATHON_ID}`),
      method: "GET",
      params: {
        hexathon: HEXATHON_ID,
      },
    },
    { useCache: false }
  );
  console.log(activeHexathon)
  if (hexathonLoading) {
    return <LoadingScreen />;
  }
  if (hexathonError) {
    return <ErrorScreen error={hexathonError} />;
  }

  const showAdmin = role.member || role.admin || role.exec;

  return (
    <Header rightItem={<Timer activeHexathon={activeHexathon} />}>
      {routes.map((route: any) => (
        <ChakraLink href={`${route.link}`}>
          <HeaderItem>{route.name}</HeaderItem>
        </ChakraLink>
      ))}
      <ChakraLink href="https://expo.hexlabs.org/" isExternal>
        <HeaderItem>Expo</HeaderItem>
      </ChakraLink>
      <ChakraLink href={`https://registration.hexlabs.org/${HEXATHON_ID}`} isExternal>
        <HeaderItem>Registration</HeaderItem>
      </ChakraLink>
      <ChakraLink href="https://login.hexlabs.org/profile" isExternal>
        <HeaderItem>Edit Profile</HeaderItem>
      </ChakraLink>
      {showAdmin && (
        <ChakraLink href={`${"/admin"}`}>
          <HeaderItem>Admin</HeaderItem>
        </ChakraLink>
      )}
    </Header>
  );
};

export default Navbar;
