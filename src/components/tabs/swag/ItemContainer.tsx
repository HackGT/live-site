/* eslint-disable */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; 
import React, { useState } from "react";
import axios from "axios";

import "./ItemContainer.css";
import { Item } from "./Item";
import { Service, useAuth, apiUrl } from "@hex-labs/core";
import UpdateSwagModal from "./UpdateSwagModal";
import DeleteSwagModal from "./DeleteSwagModal";

interface Props {
  item: Item;
  points: number;
  showBuyButton: boolean;
  showAdmin?: boolean;
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
      <VStack>
        {props.item._id}
        <Box>
          <div className="itemName">
            {props.item.name}
          </div>
        </Box>

        <Box>
          <HStack>
            <Box>
              <div className="prizePics">
                <Image alt="prizes" src={"https://drive.google.com/uc?export=view&id=" + imageID} />
              </div>
            </Box>

            <Box>
              <div className="itemInfo itemDescription">
                <b>Description: </b> {props.item.description}
                <br />
                {props.item.capacity > 0 && (
                  <span>
                    <b>Status: </b>
                    {
                      (!props.item.purchased) || (props.item.purchased < props.item.capacity) ? "In stock" : "Out of stock"
                    }
                  </span>
                )}
                <br />
                <span>
                  <b>Points Required: </b>
                  {props.item.points}
                </span>
              </div>
            </Box>
          </HStack>
        </Box>
        <Box>
          {props.showAdmin && 
            <HStack>
              <div className="itemButton">
              <IconButton
                icon={<EditIcon />}
                onClick={openUpdateSwagModal}
                aria-label="Edit"
                colorScheme="teal"
              />
              </div>
              {updateSwagModalIsOpen && 
                <UpdateSwagModal 
                  isOpen={updateSwagModalIsOpen} 
                  onClose={closeUpdateSwagModal} 
                  item={props.item}
                />}

              <div className="itemButton">
              <IconButton
                icon={<DeleteIcon />}
                onClick={openDeleteSwagModal}
                aria-label="Delete"
                colorScheme="pink"
              />
              </div>
              {deleteSwagModalIsOpen && 
                <DeleteSwagModal 
                  isOpen={deleteSwagModalIsOpen} 
                  onClose={closeDeleteSwagModal} 
                  item={props.item}
                />}
            </HStack>
          }
        </Box>
      </VStack>
    </div>
  );
};

export default ItemContainer;
