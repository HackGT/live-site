import { SearchableTable,apiUrl, Service, ErrorScreen } from "@hex-labs/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    Spacer,
    Text,
    useDisclosure,
    Link as ChakraLink
  } from "@chakra-ui/react"
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import BlockFormInput from "./FormInputs/BlockFormInput";

const limit = 50;
const columns = [
    {
        key:0,
        header: "Title",
        accessor: (row: any) => <ChakraLink as={Link} to={`/admin/blocks/${row.id}`}>{row.title}</ChakraLink>,
    },
    {
        key:1,
        header:"Content",
        accessor: (row:any) => row.content,

    },
    {
        key:2,
        header:"Slug",
        accessor: (row:any) => row.slug,

    }

  ];
  const name = "Blocks";
const BlocksTable: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [offset, setOffset] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState();
    const [data, setData] = useState<any[]>([]);
    
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
    
    
    useEffect(() => { 

        const getData = async() => {
            try {
                const res = await axios.get(
                    apiUrl(Service.HEXATHONS, `/blocks`),
                    { params: {hexathon: String(process.env.REACT_APP_HEXATHON_ID), search: searchText} }
                  );
                setData(res.data) 
            } catch(e: any) {
           setError(e);
            } 
        } 
        getData();
}, [searchText,isOpen]);
if (error) {
    return <ErrorScreen error={error} />;
  }

 
    return (
    <>
        <Box
          margin="auto"
          marginTop="20px"
          width={{
            base: "90%",
            md: "80%"
          }}
        >
          <HStack>
            <Heading>
              {name}
            </Heading>
            <Spacer/>
            <HStack spacing="5px">
              
              <Button
                width={{
                  base: "48px",
                  md: "100%",
                }}
                height="48px"
                borderRadius={{
                  base: "24px",
                  md: "0.375rem"
                }}
                onClick={onOpen}
              >
                <HStack spacing={{
                  base: "0px",
                  md: "5px"
                }}>
                  <AddIcon width="0.8em" height="0.8em"/>
                  <Text
                    display={{
                      base: "none",
                      md: "block"
                    }}
                  >
                    Create {name.substring(0, name.length - 1)}
                  </Text>
                </HStack>
              </Button>
            </HStack>
          </HStack>
          <SearchableTable
            title="Blocks"
            data={data}
            columns={columns}
            searchText={searchText}
            onSearchTextChange={onSearchTextChange}
            onPreviousClicked={onPreviousClicked}
            onNextClicked={onNextClicked}
            offset={offset}
            total={data.length}
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
          <DrawerOverlay display='none'/>
          <DrawerContent>
            <DrawerHeader borderBottom="2px" borderColor="rgba(23, 43, 77, 0.12)">
              <HStack>
                <Heading marginTop="10px" fontSize="24px">
                  Create {name.substring(0, name.length - 1)}
                </Heading>
                <Spacer/>
                <IconButton
                  aria-label="Close Button"
                  isRound
                  icon={<CloseIcon width="0.75em" height="0.75em"/>}
                  bg="transparent"
                  onClick={onClose}
                />
              </HStack>
            </DrawerHeader>
            <DrawerBody paddingTop="20px">
              <BlockFormInput onClose={onClose}/>
            </DrawerBody> 
          </DrawerContent>
        </Drawer>
      </>

            
    );
}
export default BlocksTable;