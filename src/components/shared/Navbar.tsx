import React from "react";
import { Link } from "react-router-dom";
import { Header, HeaderItem, useAuth, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import { routes } from "./Navigation";

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

  const showAdmin = role.member || role.admin || role.exec;

  return (
    <Header>
      {
        routes.map((route: any) => (
          <Link to={`${route.link}`}>
            <HeaderItem>{route.name}</HeaderItem>
          </Link>
        ))
      }
      {showAdmin &&
        <Link to={`${"/admin"}`}>
          <HeaderItem>Admin</HeaderItem>
        </Link>}
    </Header>
  )
}

export default Navbar;
