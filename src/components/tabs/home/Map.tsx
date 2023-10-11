import React, { useState } from "react";
import { Button, Box, Image, HStack } from "@chakra-ui/react";

const Map = (props: { links: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  if (!props.links) return null;

  return (
    <Box width="70%" margin="auto" marginY="20px" backgroundColor="">
      <HStack marginBottom="5px">
        {props.links.map((link: any, index: number) => (
          <Button
            onClick={() => handleTabClick(index)}
            colorScheme={activeTab === index ? "blue" : "gray"}
          >
            {link.title}
          </Button>
        ))}
      </HStack>
      <Box>
        <Image src={props.links[activeTab]?.url} alt={`Image ${activeTab}`} />
      </Box>
    </Box>
  );
};

export default Map;
