/* eslint-disable */
import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";
import { Item } from "./Item";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SwagShop.css";
import { Flex, Text, useBreakpointValue, Wrap } from "@chakra-ui/react";
import { Service, useAuth, apiUrl, LoadingScreen, ErrorScreen } from "@hex-labs/core";
import axios from "axios";
import useAxios from "axios-hooks";

const SwagShop: React.FC = props => {
  //defining variables
  const [points, setPoints] = useState(0);
  const MAX_POINTS_ATTAINABLE = 1000;
  const breakPt = useBreakpointValue({ base: "base", md: "md" });

  const { user } = useAuth();
  const hexathonID = String(process.env.REACT_APP_HEXATHON_ID);

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
  const itemGroup: Item[][] = [];
  for (let i = 0; i < items.length; i++) {
    if (i % 2 === 0) itemGroup.push([]);
    itemGroup[itemGroup.length - 1].push(items[i]);
  }

  //more loading item grid
  const itemGrid = () => {
    return (
      <Wrap spacing="30px" justify="center">
        {items.map((item: any) => {
          return <ItemContainer key={item.id} item={item} points={points} showBuyButton={true} />;
        })}
      </Wrap>
    );
  };

  return (
    <div id="swag-shop">
      <Text id="pointIndicator">You have {points} points.</Text>
      <Flex flexDirection="column" alignItems="center">
        {itemGrid()}
      </Flex>
    </div>
  );
};

export default SwagShop;
