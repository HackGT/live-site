import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const MentorTab: React.FC = () => {
  const [mentor, setMentor] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("mentor");
      setMentor(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Mentors" blocks={mentor} />
      </div>
    </div>
  );
};

export default MentorTab;
