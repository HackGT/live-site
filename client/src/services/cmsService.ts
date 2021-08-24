import axios from 'axios';

const getEventUrl = async (eventId: string): Promise<any> => {
  try {
    const ideas = await axios.get('/event/' + eventId);
    return ideas.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Please refresh page & try again.');
    }
  }
};




var query =  
  `{
    allEvents  (where: {AND:[
        {startDate_gt: "2021-03-13T00:00:00.000Z"},
        {endDate_lt: "2021-03-14T21:00:00.000Z"}
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


let fetchEvents = async ()=> {
  var res = await fetch(process.env.REACT_APP_CMS_URL|| "https://cms.hack.gt/admin/api", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query }),
  });
  var jsonResponse = await res.json();
  return jsonResponse.data;
};

// fetchEvents(query).then(data => {
//   console.log(data)
//   console.log(data.allEvents)
// })


export { getEventUrl, fetchEvents };
