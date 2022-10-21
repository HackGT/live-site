// class Page {
//   name: string;
//   link: string;
//   privateRoute: boolean;

//   constructor(name: string, link: string, privateRoute = false) {
//     this.name = name;
//     this.link = link;
//     this.privateRoute = privateRoute;
//   }
// }

// export const routes = [
//   new Page("Home", "/"),
//   new Page("Schedule", "/schedule"),
//   new Page("Tracks & Challenges", "/tracks-challenges"),
//   new Page("Mentors", "/mentors"),
//   new Page("Sponsors", "/sponsor"),
//   new Page("Swag", "/swag"),
//   new Page("Workshops", "/workshops"),
//   new Page("Hardware", "/hardware-makerspace"),
//   new Page("Accomodations", "/accomodations"),
// ];

import React, { useEffect, useState } from "react";
import { apiUrl, Header, HeaderItem, Service, useAuth } from "@hex-labs/core";
import { Link } from "react-router-dom";
import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Navigation: React.FC = () => {
  // bruh

  return (
    <Header>
      {
        <>
          <Link to={"/"}>
            <HeaderItem>Home</HeaderItem>
          </Link>
          <Link to={"/schedule"}>
            <HeaderItem>Schedule</HeaderItem>
          </Link>
          <Link to={"/tracks-challenges"}>
            <HeaderItem>Tracks & Challenges</HeaderItem>
          </Link>
          <Link to={"/mentors"}>
            <HeaderItem>Mentors</HeaderItem>
          </Link>
          <Link to={"/sponsor"}>
            <HeaderItem>Sponsors</HeaderItem>
          </Link>
          <Link to={"/swag"}>
            <HeaderItem>Swag</HeaderItem>
          </Link>
          <Link to={"/workshops"}>
            <HeaderItem>Workshops</HeaderItem>
          </Link>
          <Link to={"/hardware-makerspace"}>
            <HeaderItem>Hardware</HeaderItem>
          </Link>
          <Link to={"/accomodations"}>
            <HeaderItem>Accomodations</HeaderItem>
          </Link>
        </>
      }
    </Header>
  );
};

export default Navigation;
