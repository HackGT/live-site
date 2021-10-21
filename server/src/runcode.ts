
// const fetch = require('node-fetch');
import fetch from 'node-fetch'
async function s() {
    const fetch_url = 'https://api.daily.co/v1/meeting-tokens';
    const options = {   
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String("2d5097ee4ad938fd4f9cfe65516222b711989b541c5e42d4ad5de80e6de8ed49")
        },
        body: JSON.stringify({properties: {room_name: "event-within-meeting", is_owner: true}})
    };
    const response = await fetch(fetch_url, options)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));
    console.log(response.token)
}


s()
