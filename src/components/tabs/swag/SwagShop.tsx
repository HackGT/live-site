/* eslint-disable */
import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";
import { Item } from "./Item";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SwagShop.css";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Text,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import { Service, useAuth, apiUrl, LoadingScreen, ErrorScreen } from "@hex-labs/core";
import axios from "axios";
import useAxios from "axios-hooks";
import CreateSwagModal from "./CreateSwagModal";
import LeaderboardModal from "./LeaderboardModal";
import PointsBreakdownModal from "./PointsBreakdownModal";

const SwagShop: React.FC = props => {
  const { user } = useAuth();
  const [role, setRoles] = useState<any>({
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

  //defining variables
  const [points, setPoints] = useState(0);
  const [createSwagModalIsOpen, setCreateSwagModalIsOpen] = useState(false);
  const [pointsBreakdownModalIsOpen, setPointsBreakdownModalIsOpen] = useState(false);
  const [leaderboardIsOpen, setLeaderboardIsOpen] = useState(false);
  const MAX_POINTS_ATTAINABLE = 1000;
  const breakPt = useBreakpointValue({ base: "base", md: "md" });

  const hexathonID = String(process.env.REACT_APP_HEXATHON_ID);

  const openCreateSwagModal = () => {
    setCreateSwagModalIsOpen(true);
  };
  const closeCreateSwagModal = () => {
    setCreateSwagModalIsOpen(false);
  };
  const openPointsBreakdownModal = () => {
    setPointsBreakdownModalIsOpen(true);
  }
  const closePointsBreakdownModal = () => {
    setPointsBreakdownModalIsOpen(false);
  }
  const openLeaderboardModal = () => {
    setLeaderboardIsOpen(true);
  }
  const closeLeaderboardModal = () => {
    setLeaderboardIsOpen(false);
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

  //more loading item grid
  const itemGrid = (lowerPoints: number, higherPoints: number) => {
    return (
      <Wrap spacing="30px" justify="center">
        {items
          .filter((item: Item) => item.points > lowerPoints && item.points <= higherPoints)
          .map((item: Item) => {
            return (
              <ItemContainer
                key={item.id}
                item={item}
                points={points}
                showBuyButton={true}
                showAdmin={showAdmin}
              />
            );
          })}
      </Wrap>
    );
  };

  const itemGridAll = () => {
    return (
      <Wrap spacing="30px" justify="center">
        {items.map((item: Item) => {
          return (
            <ItemContainer
              key={item.id}
              item={item}
              points={points}
              showBuyButton={true}
              showAdmin={showAdmin}
            />
          );
        })}
      </Wrap>
    );
  };

  return (
    <div id="swag-shop">
      <Text id="pointIndicator">You have {points} points.</Text>
      <Center>
        {/* <Button onClick={() => setShowInstructionsModal(true)} colorScheme="teal" mr={2}>
          Instructions
        </Button>
        <Button onClick={() => setShowLeaderboardModal(true)} colorScheme="teal" mr={2}>
          Leaderboard
        </Button> */}
        <Button onClick={openPointsBreakdownModal} colorScheme="teal" mr={2}>
            Points Breakdown
        </Button>
        <Button onClick={openLeaderboardModal} colorScheme="teal" mr={2}>
            Leaderboard
        </Button>
        {showAdmin && (
          <Button onClick={openCreateSwagModal} colorScheme="teal">
            Add New Swag
          </Button>
      )}
      </Center>
      {pointsBreakdownModalIsOpen && (
        <PointsBreakdownModal isOpen={pointsBreakdownModalIsOpen} onClose={closePointsBreakdownModal} />
      )}
      {leaderboardIsOpen && (
        <LeaderboardModal isOpen={leaderboardIsOpen} onClose={closeLeaderboardModal} />
      )}
      {createSwagModalIsOpen && (
        <CreateSwagModal isOpen={createSwagModalIsOpen} onClose={closeCreateSwagModal} />
      )}
      <Flex flexDirection="column" alignItems="center">
        <Text id="pointCategory">Tier 1 (300 Points Each)</Text>
        {itemGrid(200, 300)}
        <Text id="pointCategory">Tier 2 (150 Points Each)</Text>
        {itemGrid(100, 150)}
        <Text id="pointCategory">Tier 3 (50 Points Each)</Text>
        {itemGrid(15, 50)}
        <Text id="pointCategory">Tier 4 (10 Points Each)</Text>
        {itemGrid(5, 10)}
        <Text id="pointCategory">Tier 5 (5 Points Each)</Text>
        {itemGrid(0, 5)}
      </Flex>

      <Box position="relative" padding="10">
        <Divider />
      </Box>

      {showAdmin &&
      <Flex flexDirection="column" alignItems="center">
        <Text id="pointCategory" alignItems="center">{" "}Admin Section (All Swag){" "}</Text>
        {itemGridAll()}
      </Flex>
      }
    </div>
  );
};

export default SwagShop;
