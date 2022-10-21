import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const SwagTab: React.FC = () => {
  const [swagInfo, setSwagInfo] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const swagData = await fetchBlock("swag");
      setSwagInfo(swagData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <BlockCollection title="Swag Economy" blocks={swagInfo} />
    </div>
  );
};

export default SwagTab;
