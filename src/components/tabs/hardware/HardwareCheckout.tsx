import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useAuth, apiUrl, Service, LoadingScreen, ErrorScreen } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { Navigate } from "react-router-dom";

import NewHardwareList from "./NewHardwareList";
import RequestedList from "./RequestedList";

const HardwareCheckout: React.FC = () => {
  const { user } = useAuth();

  const [{ data, loading, error }] = useAxios(
    apiUrl(Service.HARDWARE, `/hardware-requests?userId=${user?.uid}`)
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Flex dir="row" gap={6} p="8" justify="space-around">
      <NewHardwareList />
      {user && <RequestedList requests={data} />}
    </Flex>
  );
};

export default HardwareCheckout;
