import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, HeaderItem, Footer } from "@hex-labs/core";

import { routes } from "./Navigation";

const Navbar: React.FC = () => (
  <Header>
    {
      routes.map((route: any) => (
        <Link to={`${route.link}`}>
          <HeaderItem>{route.name}</HeaderItem>
        </Link>
      ))
    }
  </Header>
);

export default Navbar;
