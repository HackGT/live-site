import React, { useState, useEffect } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";
import Map from "./Map";
import Schedule from "../ScheduleHomePage/ScheduleTable";

const HexathonHomeTab: React.FC = () => {
  const [home, setHome] = useState<any[]>([]);
  const [mapLinks, setMapLinks] = useState<string[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(
        apiUrl(
          Service.HEXATHONS,
          `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=home`
        )
      );
      setHome(data.data.filter((block: any) => block.title !== "Map Links"));

      let links = data.data.filter((block: any) => block.title === "Map Links");
      links = JSON.parse(links[0].content);
      setMapLinks(links);
    };
    document.title = "HexLabs Live";
    getBlocks();
  }, []);

  return (
    <div>
      <Map links={mapLinks}/>
      <BlockCollection title="" blocks={home} />
      <Schedule />
    </div>
  );
};

export default HexathonHomeTab;
