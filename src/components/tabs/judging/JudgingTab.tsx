import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const JudgingTab: React.FC = () => {
  const [judging, setJudging] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("judging");
      setJudging(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Judging" blocks={judging} />
      </div>
    </div>
  );
};

export default JudgingTab;
