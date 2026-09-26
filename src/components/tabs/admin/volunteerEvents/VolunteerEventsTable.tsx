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
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, DownloadIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

import Columns from "../events/Columns";
import VolunteerEventFormInput from "./VolunteerEventFormInput";
import VolunteerEventImport from "./VolunteerEventImport";

const name = "Volunteer Events";

const releaseDrawerLock = () => {
  document.body.style.pointerEvents = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.body.removeAttribute("data-scroll-locked");
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
};

const VolunteerEventsTable: React.FC = () => {
  const [drawerMode, setDrawerMode] = useState<"create" | "import" | null>(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();
  const [columns, setColumns] = useState(Columns[name].filter((column: any) => column.enabled));

  const onClose = () => {
    setDrawerMode(null);
    releaseDrawerLock();
  };

  useEffect(() => {
    document.title = `${name} - Hexlabs Schedule`;
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/volunteer-shifts"), {
          params: { hexathon: String(process.env.REACT_APP_HEXATHON_ID) },
        });

        setData(
          res.data.map((entry: any) => ({
            ...entry,
            location: entry.location?.map((location: any) => (
              <Text key={location.id}>{location.name}</Text>
            )),
          }))
        );
      } catch (e: any) {
        setError(e);
      }
    };

    getData();
  }, [drawerMode]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSearchText(e.target.value);
  };

  const search = searchText.toLowerCase();
  const filteredData = data.filter((entry: any) => entry.name?.toLowerCase().includes(search));

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
            <Button
              width={{
                base: "48px",
                md: "auto",
              }}
              flexShrink={0}
              height="48px"
              borderRadius={{
                base: "24px",
                md: "0.375rem",
              }}
              onClick={() => setDrawerMode("import")}
            >
              <HStack
                spacing={{
                  base: "0px",
                  md: "5px",
                }}
              >
                <DownloadIcon width="0.8em" height="0.8em" />
                <Text
                  display={{
                    base: "none",
                    md: "block",
                  }}
                >
                  Import
                </Text>
              </HStack>
            </Button>
            <Button
              width={{
                base: "48px",
                md: "auto",
              }}
              flexShrink={0}
              height="48px"
              borderRadius={{
                base: "24px",
                md: "0.375rem",
              }}
              onClick={() => setDrawerMode("create")}
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
          data={filteredData}
          columns={columns}
          searchText={searchText}
          onSearchTextChange={handleSearchChange}
        />
      </Box>
      {/* Mounted only while open: with framer-motion 4 the exit animation can hang,
          leaving an invisible drawer container that swallows every click on the page */}
      {drawerMode && (
        <Drawer
          isOpen
          placement="right"
          onClose={onClose}
          blockScrollOnMount={false}
          useInert={false}
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
                  {drawerMode === "import"
                    ? `Import ${name}`
                    : `Create ${name.substring(0, name.length - 1)}`}
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
              {drawerMode === "import" ? (
                <VolunteerEventImport onClose={onClose} />
              ) : (
                <VolunteerEventFormInput onClose={onClose} />
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default VolunteerEventsTable;
