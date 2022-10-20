import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const SponsorResourcesTab: React.FC = () => {
  const [sponsorResources, setSponsorResources] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("sponsor-resources");
      setSponsorResources(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="" blocks={sponsorResources} />
      </div>
    </div>
  );
};

export default SponsorResourcesTab;
