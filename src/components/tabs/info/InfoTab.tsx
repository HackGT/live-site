import React, { useState, useEffect } from "react";

import BlockCollection from "../../common/BlockCollection";
import { fetchBlock } from "../../../services/cmsService";

const InfoTab: React.FC = () => {
  const [infoFaqs, setInfoFaqs] = useState<any[]>([]);
  const [keyInfo, setKeyInfo] = useState<any[]>([]);
  const [welcome, setWelcome] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const welcomeData = await fetchBlock("info-welcome");
      setWelcome(welcomeData.allBlocks);

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
        <BlockCollection title="" blocks={welcome} />
        <BlockCollection title="" blocks={keyInfo} />
        <BlockCollection title="Frequently Asked Questions" blocks={infoFaqs} />
      </div>
    </div>
  );
};

export default InfoTab;
