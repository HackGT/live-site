import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const TracksTab: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const trackdata = await fetchBlock("tracks");
      setTracks(trackdata.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Tracks" blocks={tracks} />
      </div>
    </div>
  );
};

export default TracksTab;
