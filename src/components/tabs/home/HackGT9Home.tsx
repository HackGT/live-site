import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

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
        <BlockCollection title="" blocks={home} />
      </div>
    </div>
  );
};

export default HackGT9HomeTab;
