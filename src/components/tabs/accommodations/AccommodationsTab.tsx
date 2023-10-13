import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { Service, apiUrl } from "@hex-labs/core";
import axios from "axios";

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
    </div>
  );
};

export default AccommodationsTab;
