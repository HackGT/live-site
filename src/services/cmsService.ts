import axios from "axios";

const REACT_APP_CMS_URL = process.env.REACT_APP_CMS_URL || "https://cms.hack.gt/admin/api";

const getEventUrl = async (eventId: string): Promise<any> =>
  // Temporarily remove this code while interaction backend is transferred over to new api repo

  // try {
  //   const event = await axios.get('/virtual/virtualInteraction/' + eventId);
  //   console.log(event)
  //   return event.data;
  // } catch (e: any) {
  //   if (e.response) {
  //     throw new Error(e.response.data.message);
  //   } else {
  //     throw new Error('Please refresh page & try again.');
  //   }
  // }

  ({
    url: "",
  });
const fetchLiveEvents = async (virtual: boolean) => {
  const today = new Date().toISOString();

  let liveEventsQuery = "";

  if (virtual) {
    liveEventsQuery = `{
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
    liveEventsQuery = `{
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

  const res = await fetch(REACT_APP_CMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: liveEventsQuery }),
  });
  const jsonResponse = await res.json();
  return jsonResponse.data;
};

const fetchUpcomingEvents = async (virtual: boolean) => {
  const today = new Date().toISOString();

  let upcomingEventsQuery = "";

  if (virtual) {
    upcomingEventsQuery = `{
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
    upcomingEventsQuery = `{
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

  const res = await fetch(REACT_APP_CMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: upcomingEventsQuery }),
  });
  const jsonResponse = await res.json();
  return jsonResponse.data;
};

const fetchAllEvents = async (virtual: boolean) => {
  let allEventsQuery = "";

  if (virtual) {
    allEventsQuery = `{
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
    allEventsQuery = `{
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

  const res = await fetch(REACT_APP_CMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: allEventsQuery }),
  });
  const jsonResponse = await res.json();
  return jsonResponse.data;
};

const fetchBlock = async (blockSlug: string) => {
  const blockQuery = `
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
  const res = await fetch(REACT_APP_CMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: blockQuery }),
  });
  const jsonResponse = await res.json();
  return jsonResponse.data;
};

export { getEventUrl, fetchAllEvents, fetchLiveEvents, fetchUpcomingEvents, fetchBlock };
