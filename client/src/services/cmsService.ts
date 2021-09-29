import axios from 'axios';

REACT_APP_CMS_URL = process.env.REACT_APP_CMS_URL || "https://keystone.dev.hack.gt"

const getEventUrl = async (eventId: string): Promise<any> => {
  try {
    const event = await axios.get('/event/virtualInteraction/' + eventId);
    console.log(eventId)
    console.log(event)
    return event.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Please refresh page & try again.');
    }
  }
};


let fetchLiveEvents = async ()=> {
  var today = new Date().toISOString()
  var liveEventsQuery =  
  `{
    allEvents  (where: {AND:[
        {startDate_lt: "${today}"},
        {endDate_gt: "${today}"}
      ]}, orderBy:"startDate") {
      id
      name
      startDate
      endDate
      description
      type {
          name
          points
      }
      url
      location {
        name
      }
      tags {
        name
      }
    }
  }
  `;
  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: liveEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};


let fetchUpcomingEvents = async ()=> {
  var today = new Date().toISOString()
  console.log(today)
  var upcomingEventsQuery =  
  `{
    allEvents (where: {startDate_gt: "${today}"}, orderBy:"startDate") {
      id
      name
      startDate
      endDate
      description
      type {
          name
          points
      }
      url
      location {
        name
      }
      tags {
        name
      }
    }
  }
  `;
  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: upcomingEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};


let fetchAllEvents = async ()=> {
  var allEventsQuery =  
  `{
    allEvents  (where: {hackathon: {name: "HackGT 7"} }, orderBy:"startDate") {
      id
      name
      startDate
      endDate
      description
      type {
          name
          points
      }
      url
      location {
        name
      }
      tags {
        name
      }
    }
  }
  `;
  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: allEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};

let fetchBlock = async (blockSlug: string)=> {
  var blockQuery =  
  `
  {
    allBlocks (where: { slug: "${blockSlug}" }) 
    {
      name
      content
    }
  }
  `;
  console.log(blockQuery)
  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: blockQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};

export { getEventUrl, fetchAllEvents, fetchLiveEvents, fetchUpcomingEvents, fetchBlock};
