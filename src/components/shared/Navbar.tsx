import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, HeaderItem, Footer } from "@hex-labs/core";

import { routes } from "./Navigation";

const Navbar: React.FC = ({ showAdmin }) => (
  <Header>
    {
      routes.map((route: any) => (
        <Link to={`${route.link}`}>
          <HeaderItem>{route.name}</HeaderItem>
        </Link>
      ))
    }
    {props.showAdmin &&
      <Link to={`${"/admin"}`}>
        <HeaderItem>Admin</HeaderItem>
      </Link>}
  </Header>
);

export default Navbar;
