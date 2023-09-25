import React, { useState, useEffect } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";
import Schedule from "../ScheduleHomePage/ScheduleTable";

const HexathonHomeTab: React.FC = () => {
  const [home, setHome] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(
        apiUrl(
          Service.HEXATHONS,
          `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=home`
        )
      );
      setHome(data.data);
    };
    document.title = "HexLabs Live";
    getBlocks();
  }, []);

  return (
    <div>
      <BlockCollection title="" blocks={home} />
      <Schedule />
    </div>
  );
};

export default HexathonHomeTab;
