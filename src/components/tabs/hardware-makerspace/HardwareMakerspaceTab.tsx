import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const HardwareMakerspaceTab: React.FC = () => {
  const [hardwareMakerspaceInfo, sethardwareMakerspaceInfo] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("hardware-makerspace");
      sethardwareMakerspaceInfo(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <BlockCollection title="" blocks={hardwareMakerspaceInfo} />
    </div>
  );
};

export default HardwareMakerspaceTab;
