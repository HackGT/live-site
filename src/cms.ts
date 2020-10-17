const fetch = require('node-fetch');

export interface ICMSEvent {
    id: string
    name: string
    startDate: string
    endDate: string
    type: {
        name: string
        points: number
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

    const data = res.json();

    return data.data as ICMSEvent | null;
}
