import '../App.css';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { fetchBlock} from '../services/cmsService';

const ScheduleTab: React.FC = () => {

  let [infoFaq, setInfoFaq] = useState<string>("")

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchBlock("info-faq");
      const faq_data = data.allBlocks[0].content
      setInfoFaq(faq_data)
     };
     getEvents();
   }, []);

  return (
    <div>
      <div className="live_events">
        <p className="live_event_title">FAQ</p>
      </div>
      <Card className="live_event_card">
        <CardContent>
          <ReactMarkdown>{infoFaq}</ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScheduleTab;
