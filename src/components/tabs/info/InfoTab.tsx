import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const ScheduleTab: React.FC = () => {
  const [infoFaqs, setInfoFaqs] = useState<any[]>([]);
  const [keyInfo, setKeyInfo] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const faqdata = await fetchBlock("info-faq");
      setInfoFaqs(faqdata.allBlocks);

      const keydata = await fetchBlock("info-key");
      setKeyInfo(keydata.allBlocks);
    };
    getEvents();
  }, []);

  return (
    <div>
      <div>
        <BlockCollection title="Key Information" blocks={keyInfo} />
        <BlockCollection title="Frequently Asked Questions" blocks={infoFaqs} />
      </div>
    </div>
  );
};

export default ScheduleTab;