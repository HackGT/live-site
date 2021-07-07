const fetch = require('node-fetch');
import moment from "moment-timezone";

export interface ICMSEvent {
    id: string
    name: string
    startDate: string
    endDate: string
    type: {
        name: string
        points: number
    }
    location: {
        name: string
    }
    url: string
}

const query = `
    query eventData($id: ID!) {
        Event(where: { id: $id }) {
            id
            name
            startDate
            endDate
            type {
                name
                points
            }
            location {  
                name
            }
            url
        }
    }
`;

const locQuery = `
    query locationData($id:ID!) {
        allEvents(where:{location_every:{id:$id}}) {
        id
            name
        startDate
        endDate
        type {
            name
            points
        }
        location {
            name
        }
        url
        } 
    }
`;

export const getCMSEvent = async (eventId) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    const variables = {
        "id": eventId
    }

    const res = await fetch(process.env.CMS_URL || "https://cms.hack.gt/admin/api", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    });

    const data = await res.json();

    return data.data?.Event as ICMSEvent | null;
}

export const getCMSLocation = async (locationID, time) => {
    time = moment(time);
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    const variables = {
        "id": locationID
    }

    const res = await fetch(process.env.CMS_URL || "https://cms.hack.gt/admin/api", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: locQuery,
            variables: variables
        })
    });

    let data = await res.json();
    let event = null;
    data = data.data.allEvents;
    for (let i = 0; i < data.length; i++) {
        if (data[i].location.length != 0) {
            let start = moment(data[i].startDate);
            let end = moment(data[i].endDate);
            if (start.isBefore(time) && end.isAfter(time)) {
                event = data[i];
            }
        }       
    }
    return event;
}
