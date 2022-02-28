import axios from "axios";

const CMS_URL = String(process.env.REACT_APP_CMS_URL);
const EVENT_NAME = String(process.env.REACT_APP_EVENT_NAME);

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

const cmsRequest = async (query: string) => {
  const response = await axios.post(CMS_URL, {
    query,
  });

  return response.data.data;
};

const fetchLiveEvents = async (virtual: boolean) => {
  const today = new Date().toISOString();

  let liveEventsQuery = "";

  if (virtual) {
    liveEventsQuery = `{
    allEvents  (where: {AND:[
        {AND:[
          {startDate_lt: "${today}"},
          {hackathon: {name: "${EVENT_NAME}"} }
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
            {hackathon: {name: "${EVENT_NAME}"} }
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

  return await cmsRequest(liveEventsQuery);
};

const fetchUpcomingEvents = async (virtual: boolean) => {
  const today = new Date().toISOString();

  let upcomingEventsQuery = "";

  if (virtual) {
    upcomingEventsQuery = `{
      allEvents (where:  {AND:[
        {AND:[
          {startDate_gt: "${today}"},
          {hackathon: {name: "${EVENT_NAME}"} }
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
        {hackathon: {name: "${EVENT_NAME}"} }
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

  return await cmsRequest(upcomingEventsQuery);
};

const fetchAllEvents = async (virtual: boolean) => {
  let allEventsQuery = "";

  if (virtual) {
    allEventsQuery = `{
      allEvents  (where:   {AND:[
        {location_some: {name: "Virtual"} },
        {hackathon: {name: "${EVENT_NAME}"} }
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
      allEvents  (where: {hackathon: {name: "${EVENT_NAME}"} }, orderBy:"startDate") {
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

  return await cmsRequest(allEventsQuery);
};

const fetchBlock = async (blockSlug: string) => {
  const blockQuery = `
  {
    allBlocks (where: 
      {AND:[
        { slug: "${blockSlug}" },
        {hackathon: {name: "${EVENT_NAME}"} }
      ]} 
      ) 
    {
      name
      content
    }
  }
  `;

  return await cmsRequest(blockQuery);
};

export { getEventUrl, fetchAllEvents, fetchLiveEvents, fetchUpcomingEvents, fetchBlock };
