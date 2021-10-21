import '../App.css';
import React, { useState, useEffect } from 'react';
import BlockCollection from './BlockCollection';

import { fetchBlock} from '../services/cmsService';

const MentorTab: React.FC = () => {

  let [mentor, setMentor] = useState<any[]>([])

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("mentor");
      setMentor(data.allBlocks)
     };
     getEvents();
   }, []);

  return (
    <div style={{height: window.innerHeight}}>
      <div className="prize_title_container">
        <h1 className="prize_title">
        Mentorship FAQ
        </h1>
      </div>
      <div>
        <BlockCollection title="" blocks={mentor} />  
      </div>
    </div>
  )
}

export default MentorTab;
