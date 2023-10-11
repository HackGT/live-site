/* eslint-disable */
import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";
import { Item } from "./Item";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SwagShop.css";
import { Button, Center, Flex, Text, useBreakpointValue, Wrap } from "@chakra-ui/react";
import { Service, useAuth, apiUrl, LoadingScreen, ErrorScreen } from "@hex-labs/core";
import axios from "axios";
import useAxios from "axios-hooks";
import CreateSwagModal from "./CreateSwagModal";

const SwagShop: React.FC = props => {
  //defining variables
  const [points, setPoints] = useState(0);
  const [createSwagModalIsOpen, setCreateSwagModalIsOpen] = useState(false);
  const MAX_POINTS_ATTAINABLE = 1000;
  const breakPt = useBreakpointValue({ base: "base", md: "md" });

  const { user } = useAuth();
  const hexathonID = String(process.env.REACT_APP_HEXATHON_ID);

  const openCreateSwagModal = () => {
    setCreateSwagModalIsOpen(true);
  }
  const closeCreateSwagModal = () => {
    setCreateSwagModalIsOpen(false);
  }

  //doing the post request to create the user
  useEffect(() => {
    const getPoints = async () => {
      if (user) {
        const pointsResp = await axios.get(
          apiUrl(Service.HEXATHONS, `/hexathon-users/${hexathonID}/users/${user?.uid}`)
        );

        const p = pointsResp.data.points;
        console.log(p);
        const pts = p.currentTotal;
        setPoints(pts);
      }
    };

    getPoints();
  }, [user]);

  const [{ data: items, loading, error }] = useAxios(
    {
      url: apiUrl(Service.HEXATHONS, "/swag-items"),
      method: "GET",
      params: {
        hexathon: String(process.env.REACT_APP_HEXATHON_ID),
      },
    },
    { useCache: false }
  );


  //more site loading procedures
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) return <ErrorScreen error={error} />;

  if (items == null) {
    return null;
  }

  //loading item grid
  // const itemGroup: Item[][] = [];
  // for (let i = 0; i < items.length; i++) {
  //   if (i % 2 === 0) itemGroup.push([]);
  //   itemGroup[itemGroup.length - 1].push(items[i]);
  // }

  // console.log(items.filter((item: Item) => item.points === 150));
  //more loading item grid
  const itemGrid = (numPoints:number) => {
    return (
      <Wrap spacing="30px" justify="center">
        {items.filter((item: Item) => item.points === numPoints).map((item: Item) => {
          return <ItemContainer key={item.id} item={item} points={points} showBuyButton={true} />;
        })}
      </Wrap>
    );
  };

  return (
    <div id="swag-shop">  
      <Text id="pointIndicator">You have {points} points.</Text>
      <Center h="10vh">
        <Button onClick={openCreateSwagModal} colorScheme="teal">Add New Swag</Button>
      </Center>
      {createSwagModalIsOpen && <CreateSwagModal isOpen={createSwagModalIsOpen} onClose={closeCreateSwagModal} />}
      <Flex flexDirection="column" alignItems="center">
        <Text id="pointCategory">Tier 1 (150 Points)</Text>
        {itemGrid(150)}
        <Text id="pointCategory">Tier 2 (100 Points)</Text>
        {itemGrid(100)}
        <Text id="pointCategory">Tier 3 (50 Points)</Text>
        {itemGrid(50)}
        <Text id="pointCategory">Tier 4 (10 Points)</Text>
        {itemGrid(10)}
      </Flex>
    </div>
  );
};

export default SwagShop;
