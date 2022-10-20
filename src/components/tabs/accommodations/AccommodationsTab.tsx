import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const AccommodationsTab: React.FC = () => {
  const [accomodations, setAccomodations] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("accomodation");
      setAccomodations(data.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Accomodations & Showers" blocks={accomodations} />
      </div>
    </div>
  );
};

export default AccommodationsTab;
