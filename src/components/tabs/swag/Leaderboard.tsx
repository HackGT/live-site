import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import {
    Service,
    apiUrl,
    LoadingScreen,
    ErrorScreen,
  } from "@hex-labs/core";

import { HEXATHON_ID } from "../../../App";



const Leaderboard: React.FC = () => {
    const [{ data, loading: hexathonLoading, error: hexathonError }] = useAxios(
        {
          url: apiUrl(Service.HEXATHONS, `/hexathon-users/${HEXATHON_ID}/users`),
          method: "GET",
        },
        { useCache: false }
      );
    const users = data?.hexathonUsers || [];
    const sortedUsers = users.sort((a:any, b:any) => {
        const sumA = (a.points?.currentTotal || 0) + (a.points?.numSpent || 0);
        const sumB = (b.points?.currentTotal || 0) + (b.points?.numSpent || 0);
        return sumB - sumA;
      });
    const numberOfTopUsers = 5
    const topNUsers = sortedUsers.slice(0, numberOfTopUsers);
    useEffect(() => {
        console.log('Users:', users);
      }, [users]);
    if (hexathonLoading) {
        return <LoadingScreen />;
    }
    if (hexathonError) {
        return <ErrorScreen error={hexathonError}/>;
    }
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Rank</Th>
                    <Th>Name</Th>
                    <Th>Total Points</Th>
                </Tr>
            </Thead>
            <Tbody>
                {topNUsers && topNUsers.length > 0 ?
                    topNUsers?.map((user:any, index: number) => (
                        <Tr key={user.name}>
                            <Td>{index + 1}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.points.currentTotal + user.points.numSpent}</Td>
                        </Tr>
                    )) : (
                    <Tr>
                        <Td colSpan={3}>No data available</Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    );
};

export default Leaderboard;
