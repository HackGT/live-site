
// const fetch = require('node-fetch');
import fetch from 'node-fetch'


async function s() {


    let newurl = 'https://api.daily.co/v1/rooms';
    const newoptions = {   
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String("badf13551a98cd601e9d00e4e068633edb0b2a4375cf08dc2b9b1237de09a003")
        },
        // body: JSON.stringify({limit: 50})
    };
    let rooms = await fetch(newurl, newoptions)
    .then(res => res.json())
    .catch(err => console.error('error:' + err));
    // console.log(rooms)

    for (let i = 0; i < rooms.data.length; i++) {
        let room = rooms.data[i]
        const fetch_url = 'https://api.daily.co/v1/meeting-tokens';
        const options = {   
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + String("badf13551a98cd601e9d00e4e068633edb0b2a4375cf08dc2b9b1237de09a003")
            },
            body: JSON.stringify({properties: {room_name: room, is_owner: true, "enable_recording": "cloud"}})
        };
        const response = await fetch(fetch_url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));

        console.log(room.name)
        console.log("https://hexlabs.daily.co/"+room.name+"?t="+response.token)

        // fs.writeFileSync('file.txt', String(room))
        // fs.writeFileSync('file.txt', "https://hexlabs.daily.co/"+String(room)+"?t="+String(response.token))
    }


}


s()
