import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const HardwareMakerspaceTab: React.FC = () => {
  const [hardwareInfo, setHardwareInfo] = useState<any[]>([]);
  const [makerspaceInfo, setMakerspaceInfo] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const makerspaceData = await fetchBlock("makerspace");
      setMakerspaceInfo(makerspaceData.allBlocks);
      const hardwareData = await fetchBlock("hardware");
      setHardwareInfo(hardwareData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <BlockCollection title="Makerspaces" blocks={makerspaceInfo} />
      <BlockCollection title="Hardware" blocks={hardwareInfo} />
    </div>
  );
};

export default HardwareMakerspaceTab;
