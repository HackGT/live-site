import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { Service, apiUrl } from "@hex-labs/core";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";

const SHOWER_SIGNUP_URL =
  "https://docs.google.com/spreadsheets/d/1A1EXUXbwzXX2CiPViHGllAgokIDeI38C3o8jIdZ4W70/edit?gid=634566308#gid=634566308";

const AccommodationsTab: React.FC = () => {
  const [accomodations, setAccomodations] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(
        apiUrl(
          Service.HEXATHONS,
          `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=accomodations`
        )
      );
      setAccomodations(data.data);
    };
    getBlocks();
  }, []);

  return (
    <div>
      <BlockCollection title="Accomodations & Showers" blocks={accomodations} />
      <Box mx="5%" mt="20px">
        <Button
          as="a"
          href={SHOWER_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          colorScheme="teal"
        >
          Shower Signup Form!
        </Button>
      </Box>
    </div>
  );
};

export default AccommodationsTab;
