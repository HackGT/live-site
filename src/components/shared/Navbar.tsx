import React from "react";
import { Link, chakra, Text } from "@chakra-ui/react";
import { Header, HeaderItem, useAuth, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import { routes } from "./Navigation";
import { HEXATHON_ID } from "../../App";

const ChakraLink = chakra(Link, {
  baseStyle: {
    _hover: {
      textDecoration: "none",
    },
  },
});

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const [role, setRoles] = React.useState<any>({
    member: false,
    exec: false,
    admin: false,
  });
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

  const [hexathons, setHexathons] = React.useState<any[]>([]);

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

  React.useEffect(() => {
    const getRoles = async () => {
      if (user?.uid) {
        const response = await axios.get(apiUrl(Service.USERS, `/users/${user?.uid}`));
        setRoles({ ...response.data.roles });
      }
    };
    getRoles();
  }, [user?.uid]);

  React.useEffect(() => {
    const getHexathons = async () => {
      try {
        const response = await axios.get(apiUrl(Service.HEXATHONS, '/hexathons'));
        setHexathons(response.data);
      } catch (error) {
        console.error("Error fetching hexathons:", error);
      }
    };
    getHexathons();
    console.log(hexathons)
  }, []);

  const activeHexathons = hexathons.filter((hexathon: any) => {
    const now = new Date().getTime();
    const startDate = new Date(hexathon.startDate).getTime();
    const endDate = new Date(hexathon.endDate).getTime();
    console.log(hexathon)
    return hexathon.isActive && now >= startDate && now <= endDate;
  });

  const showAdmin = role.member || role.admin || role.exec;

  return (
    <Header>
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
      {activeHexathons.map((hexathon: any) => (
      <div key={hexathon.id}>
        <Text style={hexathonNameStyle}>{hexathon.name}</Text>
        <Text>
          <span id="remaining-time" style={countdownTimerStyle}>{calculateTimeRemaining(hexathon.endDate)}</span>
        </Text>
      </div>
      ))}
    </Header>
  );
};

export default Navbar;
