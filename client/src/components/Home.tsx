import '../App.css';

import React, { useState, useEffect } from 'react';
import { fetchLiveEvents, fetchUpcomingEvents } from '../services/cmsService';

import EventInformation from './EventInformation';
import MainStage from './MainStage';
import LiveEvents from './LiveEvents'
import Schedule from './Schedule'
import UpcomingEvents from './UpcomingEvents'
import AllEvents from './AllEvents'

const Home: React.FC = () => {

  let [mainStageEvent, setMainStageEvent] = useState<EventInformation>(new EventInformation("", "", "", [], ""))

  const updateMainStageEvent = (e: any) => {
    setMainStageEvent(new EventInformation(e.id, e.url, e.name, e.tags, e.description))
  }

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchLiveEvents();
      const allEvents = data.allEvents
      
      // Choose which event we want to show in the main stage first
      // Youtube livestreams if they exist
      for (let i = 0; i < allEvents.length; i++) {
        if (allEvents[i].url !== null && (allEvents[i].url.includes("youtube") || allEvents[i].includes("youtu.be") ) ){
          setMainStageEvent(new EventInformation(allEvents[i].id, allEvents[i].url, allEvents[i].name, allEvents[i].tags, allEvents[i].description))
          return
        }
      }
      // Then any live event
      if (allEvents.length > 0) {
        setMainStageEvent(new EventInformation(allEvents[0].id, allEvents[0].url, allEvents[0].name, allEvents[0].tags, allEvents[0].description))
      } else {
        // Then the next upcoming event
        const upcomingData = await fetchUpcomingEvents()
        const allUpcomingEvents = upcomingData.allEvents
        
        for (let i = 0; i < allUpcomingEvents.length; i++) {
          if (allUpcomingEvents[i].url !== null) {
            setMainStageEvent(new EventInformation(allUpcomingEvents[i].id, allUpcomingEvents[i].url, allUpcomingEvents[i].name, allUpcomingEvents[i].tags, allUpcomingEvents[i].description))
          }
          return
        } 
      }

      // If all else fails, a placeholder event
      setMainStageEvent(new EventInformation("","", "No Events are currently live!", [], "Check the schedule to see when the next event will go live!"))
     };
     getEvents();
     window.scrollTo(0, 0);
   }, []);

  return (
    <div>
        <MainStage event={mainStageEvent} />
        <LiveEvents setEventCallback={updateMainStageEvent} />
        <Schedule />
        <UpcomingEvents setEventCallback={updateMainStageEvent} />
        <AllEvents setEventCallback={updateMainStageEvent} />
    </div>
  )
}


export default Home;
