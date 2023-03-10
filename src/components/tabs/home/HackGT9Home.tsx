import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

import Schedule from "../ScheduleHomePage/ScheduleTable"

const HackGT9HomeTab: React.FC = () => {
  const [home, setHome] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("home-screen");
      setHome(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Home" blocks={home} />
      </div>
        <div><Schedule/></div>
    </div>
  );
};

export default HackGT9HomeTab;
