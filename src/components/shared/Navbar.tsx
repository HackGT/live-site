/* eslint-disable */
import React from "react";
import { Link as chakraLink, chakra, Text, Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  Header,
  HeaderItem,
  useAuth,
  Service,
  apiUrl,
  LoadingScreen,
  ErrorScreen,
} from "@hex-labs/core";
import axios from "axios";
import useAxios from "axios-hooks";
import { HEXATHON_ID } from "../../App";
import { routes } from "./Navigation";
import { LockIcon } from "@chakra-ui/icons";

const ChakraLink = chakra(chakraLink, {
  baseStyle: {
    _hover: {
      textDecoration: "none",
    },
  },
});

const calculateTimeRemaining = (endTime: string): string => {
  const endDateTime = new Date(endTime).getTime();

  const updateTimer = (): string => {
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

  return updateTimer();
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
  const [remainingTime, setRemainingTime] = React.useState(
    calculateTimeRemaining(props.activeHexathon.endDate)
  );

  React.useEffect(() => {
    const updateInterval = setInterval(() => {
      const newRemainingTime = calculateTimeRemaining(props.activeHexathon.endDate);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === "Complete") {
        clearInterval(updateInterval);
      }
    }, 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [props.activeHexathon.endDate]);

  return (
    <>
      <HeaderItem key={props.activeHexathon.id}>
        <Box display="block">
          <Text style={hexathonNameStyle}>{props.activeHexathon.name}</Text>
          <Text textAlign="right">
            <span id="remaining-time" style={countdownTimerStyle}>
              {remainingTime}
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
        <Link key={route.name} to={`${route.link}`}>
          <HeaderItem>{route.name}</HeaderItem>
        </Link>
      ))}
      <ChakraLink href="https://expo.hexlabs.org/" isExternal>
        <HeaderItem>Expo</HeaderItem>
      </ChakraLink>
      <ChakraLink href={`https://registration.hexlabs.org/${HEXATHON_ID}`} isExternal>
        <HeaderItem>Registration</HeaderItem>
      </ChakraLink>
      <ChakraLink href="https://match.hexlabs.org/" isExternal>
        <HeaderItem>Match</HeaderItem>
      </ChakraLink>
      <ChakraLink href="https://login.hexlabs.org/profile" isExternal>
        <HeaderItem>Edit Profile</HeaderItem>
      </ChakraLink>
      {showAdmin && (
        <Link to="/admin">
          <HStack spacing="-1">
            <HeaderItem color="red">Admin</HeaderItem>
            <LockIcon color="red" />
          </HStack>
        </Link>
      )}
    </Header>
  );
};

export default Navbar;
