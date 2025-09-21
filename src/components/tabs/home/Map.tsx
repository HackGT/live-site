import React, { useState } from "react";
import { Button, Box, Image, HStack, ButtonGroup } from "@chakra-ui/react";

const Map = (props: { links: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  if (!props.links || props.links.length == 0) return null;

  // map each link to the image ID
  props.links.map((obj: any) => {
    if (obj.url.includes("/")) {
      const imageID = obj.url.split("/")[5];
      obj.url = imageID;
    }
  });

  return (
    <Box width={{ base: "90%", md: "75%", lg: "65%" }} margin="auto" marginTop="20px">
      <HStack marginBottom="5px">
        <ButtonGroup>
          {props.links.map((link: any, index: number) => (
            <Button
              size={{ base: "xs", lg: "md" }}
              onClick={() => handleTabClick(index)}
              colorScheme={activeTab === index ? "blue" : "gray"}
              key={link.title}
            >
              {link.title}
            </Button>
          ))}
        </ButtonGroup>
      </HStack>
      <Box>
        <Image
          rounded="md"
          src={`https://drive.google.com/thumbnail?id=${props.links[activeTab]?.url}&sz=w1000`}
          alt={props.links[activeTab].title}
        />
      </Box>
    </Box>
  );
};

export default Map;
