import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";
import { apiUrl, Service } from "@hex-labs/core";
import axios from "axios";

const JudgingTab: React.FC = () => {
  const [judging, setJudging] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(apiUrl(Service.HEXATHONS, `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=judging`));
      setJudging(data.data);
    };
    getBlocks();
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
