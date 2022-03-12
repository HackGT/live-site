import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const TracksTab: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [judging, setJudging] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const trackdata = await fetchBlock("tracks and challenges");
      setTracks(trackdata.allBlocks);
      const judgingdata = await fetchBlock("judging");
      setJudging(judgingdata.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Tracks and Challenges" blocks={tracks} />
        <BlockCollection title="Judging" blocks={judging} />
      </div>
    </div>
  );
};

export default TracksTab;
