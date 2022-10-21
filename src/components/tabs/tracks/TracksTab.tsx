import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const TracksTab: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [emergingChallenges, setEmergingChallenges] = useState<any[]>([]);
  const [emergingDescription, setEmergingDescription] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const trackdata = await fetchBlock("tracks");
      setTracks(trackdata.allBlocks);

      const emergingDescriptionData = await fetchBlock("emerging-challenge-description");
      setEmergingDescription(emergingDescriptionData.allBlocks);

      const emergingData = await fetchBlock("emerging-challenge");
      setEmergingChallenges(emergingData.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Tracks" blocks={tracks} />
        <BlockCollection title="Emerging Challenges" blocks={emergingDescription} />
        <BlockCollection title="" blocks={emergingChallenges} />
      </div>
    </div>
  );
};

export default TracksTab;
