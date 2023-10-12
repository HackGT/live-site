import React, { useState, useEffect } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";

const SponsorTab: React.FC = () => {
  const [sponsor, setSponsor] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(
        apiUrl(
          Service.HEXATHONS,
          `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=sponsor`
        )
      );
      setSponsor(data.data);
    };
    getBlocks();
  }, []);

  return (
    <div>
      <BlockCollection title="Sponsor" blocks={sponsor} />
    </div>
  );
};

export default SponsorTab;
