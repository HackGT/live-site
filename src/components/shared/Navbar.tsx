import React from "react";
import { Link, chakra } from "@chakra-ui/react";
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
        <ChakraLink href='/admin'>
          <HeaderItem>Admin</HeaderItem>
        </ChakraLink>
      )}
    </Header>
  );
};

export default Navbar;
