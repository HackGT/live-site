import axios from 'axios';

const REACT_APP_CMS_URL = process.env.REACT_APP_CMS_URL || "https://keystone.dev.hack.gt/admin/api"


const getEventUrl = async (eventId: string): Promise<any> => {
  try {
    const event = await axios.get('/virtual/virtualInteraction/' + eventId);
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


let fetchLiveEvents = async (virtual:boolean)=> {
  console.log('live')
  var today = new Date().toISOString()

if (virtual) {

  var liveEventsQuery =  
  `{
    allEvents  (where: {AND:[
        {AND:[
          {startDate_lt: "${today}"},
          {hackathon: {name: "HackGT 8"} }
        ]},
        {AND:[
          {location_some: {name: "Virtual"} },
          {endDate_gt: "${today}"}
        ]},
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

  } else {

    var liveEventsQuery =  
    `{
      allEvents  (where: {AND:[
          {AND:[
            {startDate_lt: "${today}"},
            {hackathon: {name: "HackGT 8"} }
          ]},
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
  }
  
  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: liveEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};


let fetchUpcomingEvents = async (virtual:boolean)=> {
  console.log('upcoming')
  var today = new Date().toISOString()

  if (virtual) {
    var upcomingEventsQuery =  
    `{
      allEvents (where:  {AND:[
        {AND:[
          {startDate_gt: "${today}"},
          {hackathon: {name: "HackGT 8"} }
        ]},
        {location_some: {name: "Virtual"} },
      ]}   , orderBy:"startDate") {
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

  } else {

    var upcomingEventsQuery =  
    `{
      allEvents (where:   {AND:[
        {startDate_gt: "${today}"},
        {hackathon: {name: "HackGT 8"} }
      ]}   , orderBy:"startDate") {
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
  }


  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: upcomingEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};

let fetchAllEvents = async (virtual:boolean)=> {
  console.log('all')
  if (virtual) {
    var allEventsQuery =  
    `{
      allEvents  (where:   {AND:[
        {location_some: {name: "Virtual"} },
        {hackathon: {name: "HackGT 8"} }
      ]},
      orderBy:"startDate") {
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
  } else {
    var allEventsQuery =  
    `{
      allEvents  (where: {hackathon: {name: "HackGT 8"} }, orderBy:"startDate") {
        id
        name
        startDate
        endDate
        description
        type {
            name
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
  }

  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: allEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;

};


let fetchAllKindsEvents = async (virtual:boolean)=> {
  console.log('allkinds')

  if (virtual) {
    var allEventsQuery =  
    `{
      allEvents  (where:   {AND:[
        {location_some: {name: "Virtual"} },
        {hackathon: {name: "HackGT 8"} }
      ]},
      orderBy:"startDate") {
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
  } else {
    var allEventsQuery =  
    `{
      allEvents  (where: {hackathon: {name: "HackGT 8"} }, orderBy:"startDate") {
        id
        name
        startDate
        endDate
        description
        type {
            name
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
  }

  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: allEventsQuery }),
  });
  var jsonResponse = await res.json();
  // return jsonResponse.data;

  let allEvents = jsonResponse.data.allEvents;
  let liveEvents = []
  let upcomingEvents = []

  var today = new Date()
  
  for (let i = 0; i < allEvents.length; i++) {
    var startTime  = new Date(allEvents[i].startDate);
    var endTime  = new Date(allEvents[i].endDate);
    if (startTime < today && endTime > today) {
      liveEvents.push(allEvents[i])
    } else if (startTime > today) {
      upcomingEvents.push(allEvents[i])
    }
  }
  return [allEvents, liveEvents, upcomingEvents]
};




let fetchBlock = async (blockSlug: string)=> {
  console.log('block')
  var blockQuery =  
  `
  {
    allBlocks (where: 

      {AND:[
        { slug: "${blockSlug}" },
        {hackathon: {name: "HackGT 8"} }
      ]} 
      ) 
    {
      name
      content
    }
  }
  `;
  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: blockQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};

export { getEventUrl, fetchAllEvents, fetchLiveEvents, fetchUpcomingEvents, fetchBlock, fetchAllKindsEvents};
