/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { apiUrl, ErrorScreen, SearchableTable, Service } from "@hex-labs/core";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

import Columns from "./Columns";
import EventFormInput from "./FormInputs/EventFormInput";

const name = "Events";

const EventsTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();
  const [columns, setColumns] = useState(Columns[name].filter((column: any) => column.enabled));

  useEffect(() => {
    const getData = async () => {
      let hexathonRes: any = null;

      try {
        hexathonRes = await axios.get(
          apiUrl(Service.HEXATHONS, `/hexathons/${String(process.env.REACT_APP_HEXATHON_ID)}`)
        );

        const res = await axios.get(apiUrl(Service.HEXATHONS, `/${name.toLowerCase()}`), {
          params: { hexathon: String(process.env.REACT_APP_HEXATHON_ID), search: searchText },
        });

        const temp: any[] = [];
        res.data.forEach((entry: any) => {
          temp.push({
            ...entry,
            hexathon: hexathonRes?.name,
            location: entry.location?.map((location: any) => <Text>{location.name}</Text>),
          });
        });

        setData(temp);
      } catch (e: any) {
        setError(e);
      }

      setColumns(Columns[name].filter((column: any) => column.enabled));
    };

    getData();
  }, [isOpen, searchText]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Box
        margin="auto"
        marginTop="20px"
        width={{
          base: "90%",
          md: "80%",
        }}
      >
        <HStack>
          <Heading>{name}</Heading>
          <Spacer />
          <HStack spacing="5px">
            {name === "Events" ? (
              <Menu closeOnSelect={false}>
                <MenuButton
                  marginRight="10px"
                  as={IconButton}
                  bg="transparent"
                  minWidth="48px"
                  height="48px"
                  isRound
                  padding="0px"
                  textAlign="center"
                  verticalAlign="center"
                >
                  <ViewIcon width="1.5em" height="1.5em" />
                </MenuButton>
                <MenuList zIndex="999">
                  <MenuOptionGroup
                    width="100%"
                    type="checkbox"
                    onChange={(e: any) => setColumns(e.sort((a: any, b: any) => a.key - b.key))}
                    value={columns}
                  >
                    {Columns[name].map((column: any) => (
                      <MenuItemOption key={column.key} value={column}>
                        {column.header}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            ) : null}
            <Button
              width={{
                base: "48px",
                md: "100%",
              }}
              height="48px"
              borderRadius={{
                base: "24px",
                md: "0.375rem",
              }}
              onClick={onOpen}
            >
              <HStack
                spacing={{
                  base: "0px",
                  md: "5px",
                }}
              >
                <AddIcon width="0.8em" height="0.8em" />
                <Text
                  display={{
                    base: "none",
                    md: "block",
                  }}
                >
                  Create {name.substring(0, name.length - 1)}
                </Text>
              </HStack>
            </Button>
          </HStack>
        </HStack>
        <SearchableTable
          title=""
          data={data}
          columns={columns}
          searchText={searchText}
          onSearchTextChange={handleSearchChange}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
        size="md"
        closeOnOverlayClick
        closeOnEsc
      >
        <DrawerOverlay display="none" />
        <DrawerContent>
          <DrawerHeader borderBottom="2px" borderColor="rgba(23, 43, 77, 0.12)">
            <HStack>
              <Heading marginTop="10px" fontSize="24px">
                Create {name.substring(0, name.length - 1)}
              </Heading>
              <Spacer />
              <IconButton
                aria-label="Close Button"
                isRound
                icon={<CloseIcon width="0.75em" height="0.75em" />}
                bg="transparent"
                onClick={onClose}
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody paddingTop="20px">
            <EventFormInput onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default EventsTable;
