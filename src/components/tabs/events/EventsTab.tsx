import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const ScheduleTab: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const minieventdata = await fetchBlock("workshops and mini events");
      setEvents(minieventdata.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Workshops and Mini Events" blocks={events} />
      </div>
    </div>
  );
};

export default ScheduleTab;
