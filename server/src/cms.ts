const fetch = require('node-fetch');

const query = () => `
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
        }
    }
`;

export const getCMSEvent = async (eventId) => {
    const headers = {
        "Content-Type": `application/json`,
        "Accept": `application/json`
    }

    const variables = {
        id: eventId
    }

    const res = await fetch(process.env.CMS_URL || "https://cms.hack.gt/admin/api", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    })

    const data = await res.json();

    if (res.status !== 200 || data.errors) {
        console.error(data.errors);
        return [res.statusText, null];
    }

    return [null, data];
}