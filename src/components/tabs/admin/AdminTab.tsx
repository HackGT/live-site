import React from "react";
import { Box, Flex, Stack, Heading } from "@chakra-ui/react";
import { useAuth, Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

import AdminWidget from "./AdminWidget";
import HexathonHomeTab from "../home/HexathonHome";

const AdminControlsHome: React.FC = () => {
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

  if (!showAdmin) {
    return <HexathonHomeTab />;
  }

  return (
    <Flex
      flexDir="column"
      padding={{ base: "0 0 8px 0", md: "32px 48px" }}
      margin="auto"
      maxWidth="1000px"
    >
      <Flex
        flexDir={{ base: "column", md: "row" }}
        bgGradient={{
          base: "linear(to-b, #33c2ff, #7b69ec)",
          md: "linear(to-r, #33c2ff, #7b69ec)",
        }}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        alignItems="center"
        justifyContent="space-around"
        marginBottom={{ base: "8px", md: "20px" }}
      >
        <Box
          color="white"
          paddingY={{ base: "24px", md: "24px" }}
          paddingLeft={{ base: "16px", md: "64px" }}
          paddingRight={{ base: "16px", md: "64px" }}
        >
          <Heading size="2xl" marginBottom="9px">
            Admin Controls
          </Heading>
        </Box>
      </Flex>
      <Stack spacing={4} marginX={{ base: 4, md: 0 }}>
        <AdminWidget title="Events" description="View information about events" href="events" />
        <AdminWidget title="Blocks" description="View information about blocks" href="blocks" />
      </Stack>
    </Flex>
  );
};

export default AdminControlsHome;
