import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Item, ItemByCat, ItemByLocation } from "../types/Hardware";
import HardwareCategory from "./HardwareCategory";

function filteredItems(items: Item[], searchQuery: string): Item[] {
  return items.filter((item: Item) => item.name.toLowerCase().includes(searchQuery));
}

function combinedAndFilteredItemsByCategory(categories: any, searchQuery: string): Item[] {
  return filteredItems(
    categories.reduce((acc: any, val: any) => acc.concat(val.items), []),
    searchQuery
  );
}

interface HardwareListProps {
  itemsByLocation: any;
  searchQuery: string;
  requestsEnabled: boolean;
  location: string;
}

const HardwareLocation = ({ name }: any) => (
  <Box>
    <Heading size="lg">{name}</Heading>
    <Text mt={4}>These items are available from {name}. Pick them up and return them there.</Text>
  </Box>
);

const HardwareLocationContents = ({
  itemsByLocation,
  searchQuery,
  requestsEnabled,
  location,
}: HardwareListProps) => {
  const [accordionState, setAccordionState] = useState([0]);
  return (
    <div
      style={{
        marginTop: 10,
      }}
    >
      <HardwareLocation key={`${location}-hardware_loc`} name={location} />
      <Accordion key={`${location}-accordion`} allowToggle mt={4}>
        {itemsByLocation.map((element: any) => {
          const category = element.category.name;
          const it = element.items;

          return (
            <AccordionItem key={category}>
              <AccordionButton style={{ justifyContent: "space-between" }}>
                <Text as="h3">{category}</Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <HardwareCategory
                  key={`${location}-${category}`}
                  items={filteredItems(it, searchQuery)}
                  requestsEnabled={requestsEnabled}
                  name={category}
                />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
        {/* {(!itemsByLocation ||
          !combinedAndFilteredItemsByCategory(itemsByLocation, searchQuery).length) && (
          <NoItemsFound key={`${itemsByLocation.location.id}-no_items`} searchQuery={searchQuery} />
        )} */}
      </Accordion>
    </div>
  );
};

export default HardwareLocationContents;
