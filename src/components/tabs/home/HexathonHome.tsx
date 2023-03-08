import React, { useState, useEffect } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";

const HexathonHomeTab: React.FC = () => {
  const [home, setHome] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(apiUrl(Service.HEXATHONS, `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=home`));
      setHome(data.data);
    };
    document.title = "Hexlabs Live"
    getBlocks();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Home" blocks={home} />
      </div>
    </div>
  );
};

export default HexathonHomeTab;
