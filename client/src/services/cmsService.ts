import axios from 'axios';


const REACT_APP_CMS_URL = process.env.REACT_APP_CMS_URL || "https://cms.hack.gt/admin/api"


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
      body: JSON.stringify({ query: allEventsQuery }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};




let fetchAllTypesEvents = async (virtual:boolean)=> {
  // if (virtual) {
  //   var allEventsQuery =  
  //   `{
  //     allEvents  (where:   {AND:[
  //       {location_some: {name: "Virtual"} },
  //       {hackathon: {name: "HackGT 8"} }
  //     ]},
  //     orderBy:"startDate") {
  //       id
  //       name
  //       startDate
  //       endDate
  //       description
  //       type {
  //           name
  //           points
  //       }
  //       url
  //       location {
  //         name
  //       }
  //       tags {
  //         name
  //       }
  //     }
  //   }
  //   `;
  // } else {
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

  // }


  var today = new Date();

  var res = await fetch(REACT_APP_CMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: allEventsQuery }),
  });
  var jsonResponse = await res.json();
  let allevents =  jsonResponse.data.allEvents;
  let liveevents:any = [];
  let upcomingevents:any = []
  console.log(virtual)
  for (let i = 0; i < allevents.length; i++) {
    let starttime = new Date(allevents[i].startDate)
    let endtime = new Date(allevents[i].endDate)
    // console.log(starttime, endtime, today)
    if (virtual) {
      if (starttime>today && endtime< today  && allevents[i].url) {
        console.log(starttime, endtime, today, starttime>today, endtime>today)
        liveevents.push(allevents[i])
      } else if (starttime>today && allevents[i].url) {
        upcomingevents.push(allevents[i])
      }
    } else {
      if (starttime>today && endtime> today ) {
        liveevents.push(allevents[i])
      } else if (starttime>today) {
        upcomingevents.push(allevents[i])
      }
    }
  }
  return [allevents, liveevents, upcomingevents]
};






let fetchBlock = async (blockSlug: string)=> {
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

export { getEventUrl, fetchAllEvents, fetchLiveEvents, fetchUpcomingEvents, fetchBlock, fetchAllTypesEvents};
