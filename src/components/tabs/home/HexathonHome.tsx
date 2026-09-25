import React, { useState, useEffect } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";
import OpenAIKeyButton from "./OpenAIKeyButton";
import Schedule from "../ScheduleHomePage/ScheduleTable";
import VolunteerSchedule from "../ScheduleHomePage/VolunteerSchedule";

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
      setHome(data.data.filter((block: any) => block.title !== "Map Links"));
    };
    document.title = "HexLabs Live";
    getBlocks();
  }, []);

  return (
    <div>
      <OpenAIKeyButton />
      <BlockCollection title="" blocks={home} />
      <VolunteerSchedule />
      <Schedule />
    </div>
  );
};

export default HexathonHomeTab;
