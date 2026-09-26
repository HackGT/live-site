import React, { useState } from "react";
import { Button, Box, Image, HStack, ButtonGroup, Text } from "@chakra-ui/react";

const maps = [
  { location: "Hive", floor: 1, url: "/maps/hive.png" },
  { location: "Courtyard", floor: 1, url: "/maps/courtyard.png" },
  { location: "Klaus", floor: 1, url: "/maps/klaus1.png" },
  { location: "Klaus", floor: 2, url: "/maps/klaus2.png" },
  { location: "Klaus", floor: 3, url: "/maps/klaus3.png" },
];

const Map = () => {
  const [activeLocation, setActiveLocation] = useState("Hive");
  const [activeFloor, setActiveFloor] = useState(1);
  const locations = Array.from(new Set(maps.map((map) => map.location)));
  const floorMaps = maps.filter((map) => map.location === activeLocation);
  const selectedMap = floorMaps.find((map) => map.floor === activeFloor) || floorMaps[0];

  return (
    <Box width={{ base: "95%", md: "85%", lg: "75%" }} margin="auto" marginTop="20px">
      <Text fontSize="18px" fontWeight="bold" marginBottom="10px">
        Maps
      </Text>
      <HStack marginBottom="10px" flexWrap="wrap" justifyContent="space-between">
        <ButtonGroup>
          {locations.map((location) => (
            <Button
              size={{ base: "xs", lg: "md" }}
              onClick={() => {
                setActiveLocation(location);
                setActiveFloor(1);
              }}
              colorScheme={activeLocation === location ? "blue" : "gray"}
              key={location}
            >
              {location}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup>
          {floorMaps.map(({ floor }) => (
            <Button
              size={{ base: "xs", lg: "md" }}
              onClick={() => setActiveFloor(floor)}
              colorScheme={selectedMap.floor === floor ? "blue" : "gray"}
              key={floor}
            >
              Floor {floor}
            </Button>
          ))}
        </ButtonGroup>
      </HStack>
      <Box>
        <Image
          rounded="md"
          src={selectedMap.url}
          alt={`${selectedMap.location} floor ${selectedMap.floor}`}
        />
      </Box>
    </Box>
  );
};

export default Map;
