import React, { useState, useEffect } from "react";
import BlockCollection from "../../common/BlockCollection";

import { fetchBlock } from "../../../services/cmsService";

const PrizesTab: React.FC = () => {
  let [generalPrizes, setGeneralPrizes] = useState<any[]>([]);
  let [emerginPrizes, setEmergingPrizes] = useState<any[]>([]);
  let [openSourcePrizes, setOpenSourcePrizes] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const generalData = await fetchBlock("prize-general");
      setGeneralPrizes(generalData.allBlocks);

      const emergingData = await fetchBlock("prize-emerging");
      setEmergingPrizes(emergingData.allBlocks);

      const openSourceData = await fetchBlock("prize-open");
      setOpenSourcePrizes(openSourceData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div className="prize_title_container">
        <h1 className="prize_title">Prizes</h1>
      </div>
      <div>
        <BlockCollection title="General Track" blocks={generalPrizes} />
        <BlockCollection title="Emerging Track" blocks={emerginPrizes} />
        <BlockCollection title="Open Source Track" blocks={openSourcePrizes} />
      </div>
    </div>
  );
};

export default PrizesTab;
