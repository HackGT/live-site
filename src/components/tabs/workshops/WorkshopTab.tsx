import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const WorkshopTab: React.FC = () => {
  const [emergingWorkshops, setEmergingWorkshops] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const emergingWorkshopData = await fetchBlock("workshop");
      setEmergingWorkshops(emergingWorkshopData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <BlockCollection title="Emerging Workshops" blocks={emergingWorkshops} />
    </div>
  );
};

export default WorkshopTab;
