import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const PrizesTab: React.FC = () => {
  const [horizonsPrizes, setHorizonsPrizes] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const horizonsData = await fetchBlock("prizes");
      setHorizonsPrizes(horizonsData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div className="prize_title_container">
        <h1 className="prize_title">Prizes</h1>
      </div>
      <div>
        <BlockCollection title="Horizons Awards" blocks={horizonsPrizes} />
      </div>
    </div>
  );
};

export default PrizesTab;
