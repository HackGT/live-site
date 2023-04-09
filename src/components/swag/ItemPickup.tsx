import {
  Service,
  useAuth,
  apiUrl,
  LoadingScreen,
  ErrorScreen,
} from "@hex-labs/core";
import React, { useState } from "react";
import ItemContainer from "./ItemContainer";
import useAsyncEffect from "use-async-effect";
import axios from "axios";
import useAxios from "axios-hooks";
import { Item } from "./Item";
import { Flex, Text, useBreakpointValue, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";

interface Props {
  uid: string;
}

const ItemPickup: React.FC<Props> = (props) => {
  const uid = props.uid;
  const user = useAuth();
  const [points, setPoints] = useState(0);
  const [isMember, setIsMember] = useState<boolean>(false);
  const hexathonID = String(process.env.REACT_APP_HEXATHON_ID);

  useEffect(() => {
    const getAdmin = async () => {
      if (user) {
        const isMemberResponse = await axios.get(
          apiUrl(
            Service.HEXATHONS,
            `hexathon-users/${hexathonID}/users/${user.user!.uid}`
          )
        );
        setIsMember(isMemberResponse.data.isMember);

        const response = await axios.get(
          apiUrl(Service.USERS, `/users/${user.user!.uid}`)
        );
        setPoints(response.data.points);
      }
    };

    getAdmin();
  }, [user]);

  const [{ data: items, loading, error }] = useAxios(
    {
      url: apiUrl(Service.HEXATHONS, "/swag-items"),
      method: "GET",
      params: {
        hexathon: hexathonID,
      },
    },
    { useCache: false }
  );
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) return <ErrorScreen error={error} />;

  if (items == null) {
    return null;
  }
  const itemGroup: Item[][] = [];
  for (let i = 0; i < items.length; i++) {
    if (i % 2 === 0) itemGroup.push([]);
    itemGroup[itemGroup.length - 1].push(items[i]);
  }
  const itemGrid = () => {
    return (
      <Wrap spacing="30px" justify="center">
        {items.map((item: any) => {
          return (
            <ItemContainer
              key={item.id}
              item={item}
              points={points}
              showBuyButton={false}
            />
          );
        })}
      </Wrap>
    );
  };

  return (
    <div id="swag-shop">
      <Text margin="rem" fontSize="2xl">
        You have {points} points.
      </Text>
      <br />
      <Flex flexDirection="column" alignItems="center">
        {itemGrid()}
      </Flex>
    </div>
  );
};

export default ItemPickup;
