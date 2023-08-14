/* eslint-disable */
import React from "react";
import "./ItemContainer.css";
// import "./../../App.css";
import { Item } from "./Item";
import { Image, HStack, Box } from "@chakra-ui/react";

interface Props {
  item: Item;
  points: number;
  showBuyButton: boolean;
}

const ItemContainer: React.FC<Props> = (props: Props) => {
  // console.log(props.item.image, props.item.image_url.split("/")[5])
  const imageID = props.item.image_url.split("/")[5] ?? "14MqC1uqI4Vzzvc1dJmpOwiclWwlsHn6s";

  return (
    <div className="glowingItem">
      <HStack>
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
          </div>
        </Box>
      </HStack>
    </div>
  );
};

export default ItemContainer;
