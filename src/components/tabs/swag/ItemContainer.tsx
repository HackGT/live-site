/* eslint-disable */
import {
  Box,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; 
import React, { useState } from "react";

import "./ItemContainer.css";
import { Item } from "./Item";
import UpdateSwagModal from "./UpdateSwagModal";
import DeleteSwagModal from "./DeleteSwagModal";

interface Props {
  item: Item;
  points: number;
  showBuyButton: boolean;
}

const ItemContainer: React.FC<Props> = (props: Props) => {
  // console.log(props.item.image, props.item.image_url.split("/")[5])
  const imageID = props.item.image_url.split("/")[5] ?? "14MqC1uqI4Vzzvc1dJmpOwiclWwlsHn6s";

  const [updateSwagModalIsOpen, setUpdateSwagModalIsOpen] = useState(false);
  const [deleteSwagModalIsOpen, setDeleteSwagModalIsOpen] = useState(false);
  const openUpdateSwagModal = () => {
    setUpdateSwagModalIsOpen(true);
  }
  const closeUpdateSwagModal = () => {
    setUpdateSwagModalIsOpen(false);
  }
  const openDeleteSwagModal = () => {
    setDeleteSwagModalIsOpen(true);
  }
  const closeDeleteSwagModal = () => {
    setDeleteSwagModalIsOpen(false);
  }

  return (
    <div className="glowingItem">
      <HStack>
        {props.item._id}
        <Box>
          <div className="prizePics">
            <Image alt="prizes" src={"https://drive.google.com/uc?export=view&id=" + imageID} />
          </div>
        </Box>
        <Box>
          <div className="itemInfo itemDescription">
            <h2>{props.item.name}</h2>
            <span>
              <b>Description: </b>
              {props.item.description}
            </span>
            <br />
            {props.item.capacity > 0 && (
              <span>
                <b>Status: </b>{" "}
                {props.item.purchased < props.item.capacity ? "In stock" : "Out of stock"}
              </span>
            )}
            <br />
            <span>
              <b>Points Required: </b>
              {props.item.points}
            </span>
            <Flex justify="space-between">
              <IconButton
                icon={<EditIcon />}
                onClick={openUpdateSwagModal}
                aria-label="Edit"
                colorScheme="teal"
              />
              {updateSwagModalIsOpen && <UpdateSwagModal isOpen={updateSwagModalIsOpen} onClose={closeUpdateSwagModal} item={props.item}/>}
              
              <Flex justify="flex-end">
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={openDeleteSwagModal}
                  aria-label="Delete"
                  colorScheme="pink"
                />
                {deleteSwagModalIsOpen && <DeleteSwagModal isOpen={deleteSwagModalIsOpen} onClose={closeDeleteSwagModal} item={props.item}/>}
              </Flex>
            </Flex>
          </div>
        </Box>
      </HStack>
    </div>
  );
};

export default ItemContainer;
