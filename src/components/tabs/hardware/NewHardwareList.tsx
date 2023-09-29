import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Center, Flex, Heading, Input, Text, Grid, Alert } from "@chakra-ui/react";
import { apiUrl, ErrorScreen, LoadingScreen, Service, useAuth } from "@hex-labs/core";
import useAxios from "axios-hooks";

import HardwareLocationContents from "./inventory/HardwareLocationContents";

const NewHardwareList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const [{ data, loading, error }] = useAxios(apiUrl(Service.HARDWARE, "/items"));

  const [{ data: profile, loading: profileLoading, error: profileError }] = useAxios(
    apiUrl(Service.USERS, `/users/${user?.uid}`)
  );

  if (error || profileError) {
    return <ErrorScreen error={(error || profileError) as Error} />;
  }

  if (loading || profileLoading) {
    return <LoadingScreen />;
  }

  // TODO: Use the settings to determine if requests are enabled
  const requestsEnabled = true;
  // if (!setting.error && setting.data.setting !== undefined) {
  //   requestsEnabled = setting.data.setting.value === "true";
  // }

  let noRequestsMessageText = "";
  if (!requestsEnabled) {
    noRequestsMessageText = "Hardware checkout requests can't be made at this time.";
  } else if (requestsEnabled && !user) {
    noRequestsMessageText = "Sign in to request hardware.";
  }

  const noRequestsMessage =
    !requestsEnabled || !user ? (
      <Grid>
        <Alert>
          <Text as="h1">Look, but do not touch</Text>
          {noRequestsMessageText}
        </Alert>
      </Grid>
    ) : (
      ""
    );

  return (
    <Flex w="45%" flexDir="column">
      <Heading mb={4}>Inventory</Heading>
      <Flex gap="10px" flexDir="column">
        <Flex flexDir="row" gap={2}>
          {profile.roles.admin && (
            <Link to="/hardware/items/new">
              <Button px={6} colorScheme="twitter" color="white">
                Create item
              </Button>
            </Link>
          )}
          {noRequestsMessage}
          <Input
            placeholder="Search for item"
            onChange={(e: any) => {
              if (e.target.value.length > 1) {
                setSearchQuery(e.target.value.trim().toLowerCase());
              } else {
                setSearchQuery("");
              }
            }}
          />
        </Flex>
        {data && data.length > 0 ? (
          data?.map((locGroup: any) => {
            const locationname = locGroup.location.name;
            return (
              <HardwareLocationContents
                key={locationname}
                location={locationname}
                requestsEnabled={requestsEnabled}
                itemsByLocation={locGroup.categories}
                searchQuery={searchQuery}
              />
            );
          })
        ) : (
          <Center h="110px">
            <Text fontWeight="semibold">No hardware available right now!</Text>
          </Center>
        )}
      </Flex>
    </Flex>
  );
};

export default NewHardwareList;
