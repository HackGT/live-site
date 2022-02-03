import React, { useState, useEffect } from "react";
import BlockCollection from "../../common/BlockCollection";

import { fetchBlock } from "../../../services/cmsService";

const MentorTab: React.FC = () => {
  let [sponsor, setSponsor] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("sponsor");
      setSponsor(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div className="prize_title_container">
        <h1 className="prize_title">Sponsors FAQ</h1>
      </div>
      <div>
        <BlockCollection title="" blocks={sponsor} />
      </div>
    </div>
  );
};

export default MentorTab;
