/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  useDisclosure,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { apiUrl, ErrorScreen, LoadingScreen, SearchableTable, Service } from "@hex-labs/core";
import useAxios from "axios-hooks";
import { HEXATHON_ID } from "../../../App";
import ItemCheckoutModal from "./ItemCheckoutModal";
import EditUserModal from "./EditUserModal";
import PointDataModal from "./InteractionDataModal";

const limit = 50;

const RedeemSwag: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editUserIsOpen,
    onOpen: editUserOnOpen,
    onClose: editUserOnClose,
  } = useDisclosure();
  const {
    isOpen: pointDataIsOpen,
    onOpen: pointDataOnOpen,
    onClose: pointDataOnClose,
  } = useDisclosure();

  const [modalUserId, setModalUserId] = useState(null);

  const [{ data, error }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, `/hexathon-users/${HEXATHON_ID}/users`),
    params: {
      search: searchText,
      offset,
    },
  });

  const [{ data: swagItems, loading: swagLoading, error: swagItemsError }] = useAxios({
    method: "GET",
    url: apiUrl(Service.HEXATHONS, "/swag-items"),
    params: {
      hexathon: HEXATHON_ID,
    },
  });

  // const [userData, setUserData] = useState(data?.hexathonUsers);
  // useEffect(() => {
  //   if (!usersLoading) {
  //     if (searchText === "") {
  //       setUserData(data?.hexathonUsers);
  //     } else {
  //       setUserData(
  //         data.hexathonUsers.filter((user: any) =>
  //           user.name.toLowerCase().includes(searchText.toLowerCase())
  //         )
  //       );
  //     }
  //   }
  // }, [searchText])

  const openCheckoutModal = (row: any) => {
    setModalUserId(row.userId);
    onOpen();
  };

  const closeCheckoutModal = () => {
    setModalUserId(null);
    onClose();
  };

  const openEditUserModal = (row: any) => {
    setModalUserId(row.userId);
    editUserOnOpen();
  };

  const closeEditUserModal = () => {
    setModalUserId(null);
    editUserOnClose();
  };

  const openPointDataModal = (row: any) => {
    setModalUserId(row.userId);
    pointDataOnOpen();
  };

  const closePointDataModal = () => {
    setModalUserId(null);
    pointDataOnClose();
  };

  const columns = [
    {
      key: 0,
      header: "Name",
      accessor: (row: any) => row.name,
    },
    {
      key: 1,
      header: "Email",
      accessor: (row: any) => row.email,
    },
    {
      key: 2,
      header: "Points",
      accessor: (row: any) => row.points.currentTotal,
    },
    {
      key: 3,
      header: "Actions",
      accessor: (row: any) => (
        <ButtonGroup size="sm">
          <Button onClick={() => openCheckoutModal(row)}>Buy Item</Button>
          <Button onClick={() => openEditUserModal(row)}>Edit Points</Button>
          <Button onClick={() => openPointDataModal(row)}>View Interaction Data</Button>
        </ButtonGroup>
      ),
    },
  ];

  const onPreviousClicked = () => {
    setOffset(offset - limit);
  };

  const onNextClicked = () => {
    setOffset(offset + limit);
  };

  const onSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    setOffset(0);
  };

  if (swagLoading) {
    return <LoadingScreen />;
  }

  if (error || swagItemsError) {
    return <ErrorScreen error={error || (swagItemsError as Error)} />;
  }

  return (
    <>
      <ItemCheckoutModal
        userId={modalUserId}
        isOpen={isOpen}
        onClose={closeCheckoutModal}
        swagItems={swagItems}
      />
      <EditUserModal userId={modalUserId} isOpen={editUserIsOpen} onClose={closeEditUserModal} />
      <PointDataModal userId={modalUserId} isOpen={pointDataIsOpen} onClose={closePointDataModal} />
      <Alert status="info">
        <AlertIcon />
        <AlertTitle>How to Use</AlertTitle>
        <AlertDescription>
          Search for a participants name and then you'll be able to select the prize and quantity
          for them to buy.
        </AlertDescription>
      </Alert>
      <SearchableTable
        title="Registered Users"
        data={data?.hexathonUsers}
        columns={columns}
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        onPreviousClicked={onPreviousClicked}
        onNextClicked={onNextClicked}
        offset={offset}
        total={data?.total}
      />
    </>
  );
};

export default RedeemSwag;
