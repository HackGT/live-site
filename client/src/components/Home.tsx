import '../App.css';

import React, { useState, useEffect } from 'react';
import { fetchAllKindsEvents } from '../services/cmsService';

import EventInformation from './EventInformation';
import MainStage from './MainStage';
import LiveEvents from './LiveEvents'
import ScheduleHome from './ScheduleHome'
import UpcomingEvents from './UpcomingEvents'
import SeeFullScheduleButton from './SeeFullScheduleButton'
import AllEvents from './AllEvents'


type Props = {
  virtual: boolean;
  confirmed: boolean;
};

const Home: React.FC<Props> = (props: Props) => {

// const Home: React.FC = () => {

  let [mainStageEvent, setMainStageEvent] = useState<EventInformation>(new EventInformation("", "", "", [], ""))
  
  const updateMainStageEvent = (e: any) => {
    setMainStageEvent(new EventInformation(e.id, e.url, e.name, e.tags, e.description))

    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    const getEvents = async () => {
      // const data = await fetchLiveEvents(true);
      // const allEvents = data.allEvents
      let vals = await fetchAllKindsEvents(true);
      liveEvents = vals[1]
      console.log(liveEvents)
      
      // Choose which event we want to show in the main stage first
      // Youtube livestreams if they exist
      console.log(liveEvents)
      for (let i = 0; i < liveEvents.length; i++) {
        if (liveEvents[i].url !== null && (liveEvents[i].url.includes("youtube") || liveEvents[i].url.includes("youtu.be") ) ){
          setMainStageEvent(new EventInformation(liveEvents[i].id, liveEvents[i].url, liveEvents[i].name, liveEvents[i].tags, liveEvents[i].description))
          return
        }
      }
      
      // Then any live event
      if (liveEvents.length > 0) {
        setMainStageEvent(new EventInformation(liveEvents[0].id, liveEvents[0].url, liveEvents[0].name, liveEvents[0].tags, liveEvents[0].description))
        return
      }

      // Then the next upcoming event
      // const upcomingData = await fetchUpcomingEvents(true)
      // const allUpcomingEvents = upcomingData.allEvents
      const allUpcomingEvents = vals[2]
      for (let i = 0; i < allUpcomingEvents.length; i++) {
        if (allUpcomingEvents[i].url !== null) {
          setMainStageEvent(new EventInformation(allUpcomingEvents[i].id, allUpcomingEvents[i].url, allUpcomingEvents[i].name, allUpcomingEvents[i].tags, allUpcomingEvents[i].description))
        }
        return
      } 
      
      // If all else fails, a placeholder event
      setMainStageEvent(new EventInformation("","", "No Events are currently live!", [], "Check the schedule to see when the next event will go live!"))
     };
     getEvents();
     window.scrollTo(0, 0);
   }, []);

  // Logic for updating Upcoming and Live events
  let [liveEvents, setLiveEvents] = useState<any[]>([])
  let [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  let [allEvents, setAllEvents] = useState<any[]>([])
  // console.log('dfsdfdf', liveEvents)

  // The time to refresh next, use the next Upcoming Event to time this.
  async function updateEvents() {
    let vals = await fetchAllKindsEvents(true);
    // const upcomingEventDataRaw = await fetchUpcomingEvents(true);
    // const liveEventDataRaw = await fetchLiveEvents(true);

    // const upcomingEventData = upcomingEventDataRaw.allEvents
    // const liveEventData = liveEventDataRaw.allEvents 
    const upcomingEventData = vals[2]
    const liveEventData = vals[1]
    setAllEvents(vals[0]);
    console.log(allEvents)
    console.log(liveEvents)
    // console.log(vals)
    // console.log(upcomingEventData)
    


    let minRefreshTime = new Date(Date.now() + 6000000)
    for (let i = 0; i < upcomingEventData.length; i++) {
      let event_start = new Date(upcomingEventData[i].startDate);
      if (event_start < minRefreshTime) {
        minRefreshTime = event_start
      }
    }
    for (let i = 0; i < liveEventData.length; i++) {
      let event_end = new Date(liveEventData[i].endDate);
      if (event_end < minRefreshTime) {
        minRefreshTime = event_end
      }
    }
    setLiveEvents(liveEventData);

    let sortedUpcomingEvents = upcomingEventData.sort(function(a: any, b: any) {
      let dateA = a.startDate;
      let dateB = b.startDate;
      return dateA >= dateB ? 1 : -1;
    })
    setUpcomingEvents(sortedUpcomingEvents.splice(0, 9));

    let nextRefreshTime = minRefreshTime.getTime() - Date.now()
    if (nextRefreshTime > 0) {
      setTimeout(updateEvents, nextRefreshTime);
    } else {
      setTimeout(updateEvents, 600000)
    }
  }

  useEffect(()=>{
    updateEvents();
  }, [])


  if (props.virtual) {

    return (
      <div>
          <MainStage event={mainStageEvent} confirmed={props.confirmed}/>
          <LiveEvents setEventCallback={updateMainStageEvent} events={liveEvents} />
          {/* <Schedule tableLength={6} homepage={true} virtual={props.virtual}/> */}
          <ScheduleHome tableLength={6} homepage={true} virtual={props.virtual} events={upcomingEvents}/>
          <SeeFullScheduleButton />
          <UpcomingEvents setEventCallback={updateMainStageEvent} events={upcomingEvents} />
          <AllEvents setEventCallback={updateMainStageEvent}  events={allEvents}/>
      </div>
    )

  } else {

    return (
      <div>
          {/* <Schedule tableLength={6} homepage={true} virtual={props.virtual}/> */}
          <ScheduleHome tableLength={6} homepage={true} virtual={props.virtual} events={upcomingEvents}/>
          <SeeFullScheduleButton />
          <UpcomingEvents setEventCallback={updateMainStageEvent} events={upcomingEvents} />
          <MainStage event={mainStageEvent} confirmed={props.confirmed}/>
          <LiveEvents setEventCallback={updateMainStageEvent} events={liveEvents} />
          <AllEvents setEventCallback={updateMainStageEvent}  events={allEvents}/>
      </div>
    )

  }


 
}

export default Home;
