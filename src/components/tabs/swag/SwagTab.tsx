import React, { useState, useEffect } from "react";
import { Box, Flex, Stack, Heading } from "@chakra-ui/react";
import {
  Header,
  HeaderItem,
  useLogin,
  LoadingScreen,
  AuthProvider,
  useAuth,
  Service,
  apiUrl,
  Footer,
  ErrorScreen,
} from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";
import SwagShop from "./SwagShop";
import AdminWidget from "../admin/AdminWidget";

const SwagTab: React.FC = () => {
  const [swagInfo, setSwagInfo] = useState<any[]>([]);
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
  const item_checkout = showAdmin ? (
    <AdminWidget
      title="[ADMIN]Item Checkout"
      description="Checkout swag items for participants!"
      href="item-checkout"
    />
  ) : (
    <div />
  );

  useEffect(() => {
    const getEvents = async () => {
      const swagData = await fetchBlock("swag");
      setSwagInfo(swagData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <Flex
        flexDir="column"
        padding={{ base: "0 0 8px 0", md: "32px 48px" }}
        margin="auto"
        maxWidth="1000px"
      >
        <Stack spacing={4} marginX={{ base: 4, md: 0 }}>
          {item_checkout}
        </Stack>
      </Flex>
      <SwagShop />
    </div>
  );
};
export default SwagTab;
