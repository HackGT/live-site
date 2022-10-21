import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const SponsorTab: React.FC = () => {
  const [sponsorChallenges, setSponsorChallenges] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("sponsor-challenges");
      setSponsorChallenges(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="" blocks={sponsorChallenges} />
      </div>
    </div>
  );
};

export default SponsorTab;
