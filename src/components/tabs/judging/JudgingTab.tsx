import React, { useState, useEffect } from "react";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

import BlockCollection from "../../common/BlockCollection";

const JudgingTab: React.FC = () => {
  const [judging, setJudging] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(
        apiUrl(
          Service.HEXATHONS,
          `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=judging`
        )
      );
      setJudging(data.data);
    };
    getBlocks();
  }, []);

  return (
    <div>
      <BlockCollection title="Judging" blocks={judging} />
    </div>
  );
};

export default JudgingTab;
