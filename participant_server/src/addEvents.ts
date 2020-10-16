import { createNew, IEvent, Event, IEventMongoose} from "./schema";



// createNew<IEvent>(Event, {

// })
// 
// let events: IEvent[] = [{
//     name: "NCR Sponsor Challenge",
//     type: "Tech Talk",
//     startime: new Date("October 16, 2020 19:30:00 EDT"),
//     endtime:new Date("October 16, 2020 20:00:00 EDT"),
//     // times: {new Date("October 16, 2020 19:30:00 EDT"), new Date("October 16, 2020 20:00:00")},
//     points: 5,
//     meetingID: 891100086,
//     passcode: 2041
// }]


let events: IEvent[] = [
    {
        // _id: 12345,
        name: "NCR Sponsor Challenge",
        type: "Tech Talk",
        starttime: new Date("October 16, 2020 19:30:00 EDT"),
        endtime: new Date("October 16, 2020 20:00:00 EDT EDT"),
        points: 10,
        url: "https://bluejeans.com/891100086",
    },
    {
        name: "NCR Design Workshop",
        type: "Tech Talk",
        starttime: new Date("October 16, 2020 20:30:00 EDT"),
        endtime: new Date("October 16, 2020 21:30:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/398545345",
    },
    {
        name: "Wayfair Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 10:30:00 EDT"),
        endtime: new Date("October 17, 2020 11:00:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/340471228"
    },
    {
        name: "IBM Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 12:00:00 EDT"),
        endtime: new Date("October 17, 2020 12:30:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/129937416"
    },
    {
        name: "GM Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 12:30:00 EDT"),
        endtime: new Date("October 17, 2020 13:00:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/148778069"
    },
    {
        name: "Anthem Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 13:30:00 EDT"),
        endtime: new Date("October 17, 2020 14:00:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/764810459"
    },
    {
        name: "NSIN Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 15:00:00 EDT"),
        endtime: new Date("October 17, 2020 15:30:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/201156086"
    },
    {
        name: "Microsoft Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 17:00:00 EDT"),
        endtime: new Date("October 17, 2020 17:30:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/735730043"
    },
    {
        name: "Blackrock Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 17:30:00 EDT"),
        endtime: new Date("October 17, 2020 18:00:00 EDT"),
        points: 10,
        url: "https://bluejeans.com/797564259"
    },
    {
        name: "Blackrock Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 16, 2020 22:00:00 EDT"),
        endtime: new Date("October 16, 23:00:00 EDT"),
        points: 5,
        url: "https://bluejeans.com/568823688"
    },
    {
        name: "Anthem Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 11:30:00 EDT"),
        endtime: new Date("October 17, 12:30:00 EDT"),
        points: 5,
        url: "https://bluejeans.com/626750528"
    },
    {
        name: "GM Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 13:00:00 EDT"),
        endtime: new Date("October 17, 14:00:00 EDT"),
        points: 5,
        url: "https://bluejeans.com/996851227"
    },
    {
        name: "NCR Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 15:30:00 EDT"),
        endtime: new Date("October 17, 16:30:00 EDT"),
        points: 5,
        url: "https://bluejeans.com/732170726"
    },
    {
        name: "NSIN Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 16:30:00 EDT"),
        endtime: new Date("October 17, 17:30:00 EDT"),
        points: 5,
        url: "https://bluejeans.com/825086141"
    },
    {
        name: "Web Dev 1 Workshop / OFfice Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00 EDT"),
        endtime: new Date("October 16, 22:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/693811111"
    },
    {
        name: "Web Dev 2 Workshop",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 22:00:00 EDT"),
        endtime: new Date("October 16, 23:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/613306731"
    },
    {
        name: "Prototype Workshop",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 23:00:00 EDT"),
        endtime: new Date("October 17, 12:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/683549242"
    },
    {
        name: "App Dev Workshop 1 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00 EDT"),
        endtime: new Date("October 16, 22:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/492994741"
    },
    {
        name: "App Dev Workshop 2 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 22:00:00 EDT"),
        endtime: new Date("October 17, 00:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/894804876"
    },
    {
        name: "Data Science Workshop 1 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00 EDT"),
        endtime: new Date("October 16, 22:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/136170629"
    },
    {
        name: "Data Science Workshop 2 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 22:00:00 EDT"),
        endtime: new Date("October 17, 00:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/847022760"
    },
    {
        name: "Gaming and Graphics Workshop 1 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00 EDT"),
        endtime: new Date("October 16, 22:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/978047451"
    },
    {
        name: "Gaming and Graphics Workshop 2 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00 EDT"),
        endtime: new Date("October 17, 12:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/489296217"
    },
    {
        name: "Web Dev 3 Workshop / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00 EDT"),
        endtime: new Date("October 17, 12:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/919084003"
    },
    {
        name: "App Dev 3 Workshop / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00 EDT"),
        endtime: new Date("October 17, 12:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/545457659"
    },
    {
        name: "Data Science 3 Workshop / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00 EDT"),
        endtime: new Date("October 17, 12:00:00 EDT"),
        points: 15,
        url: "https://bluejeans.com/823880646"
    },
    {
        name: "NCR - Pillow Fort",
        type: "Mini Event",
        starttime: new Date("October 16, 2020 23:00:00 EDT"),
        endtime: new Date("October 16, 2020 23:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/638086226"
    },
    {
        name: "Anthem - Community Hangout",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 01:00:00 EDT"),
        endtime: new Date("October 17, 2020 01:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/225156525"
    },
    {
        name: "Wayfair - Scavenger Hunt",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 11:00:00 EDT"),
        endtime: new Date("October 17, 2020 11:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/990441768"
    },
    {
        name: "GM - Typing Speed Racer",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 13:00:00 EDT"),
        endtime: new Date("October 17, 2020 13:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/511853759"
    },
    {
        name: "IBM - Among Us Personalization",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 14:30:00 EDT"),
        endtime: new Date("October 17, 2020 15:00:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/670093698"
    },
    {
        name: "BlackRock - The Wiki Game",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 16:00:00 EDT"),
        endtime: new Date("October 17, 2020 16:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/253589042"
    },
    {
        name: "Microsoft - Yoga",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 18:00:00 EDT"),
        endtime: new Date("October 17, 2020 18:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/162127374"
    },
    {
        name: "NSIN - Codenames",
        type: "Mini Event",
        starttime: new Date("October 17, 2020 19:30:00 EDT"),
        endtime: new Date("October 17, 2020 20:00:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/213407861"
    },
    {
        name: "MLH - Werewolf",
        type: "Mini Event",
        starttime: new Date("October 18, 2020 00:00:00 EDT"),
        endtime: new Date("October 18, 2020 00:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/923703842"
    },
    {
        name: "MLH - CTF",
        type: "Mini Event",
        starttime: new Date("October 18, 2020 13:00:00 EDT"),
        endtime: new Date("October 18, 2020 13:30:00 EDT"),
        points: 20,
        url: "https://bluejeans.com/462407970"
    },
    {
        name: "Opening Ceremonies",
        type: "Opening Ceremonies",
        starttime: new Date("October 16, 2020 17:00:00 EDT"),
        endtime: new Date("October 16, 2020 18:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/77Bs_7LFujE"
    },
    {
        name: "Closing Ceremonies",
        type: "Closing Ceremonies",
        starttime: new Date("October 18, 2020 15:30:00 EDT"),
        endtime: new Date("October 18, 2020 16:30:00 EDT"),
        points: 20,
        url: "https://youtu.be/xw_PEnX7T_4"
    },
    {
        name: "HackGT Organizer Panel",
        type: "Speakers",
        starttime: new Date("October 17, 2020 22:00:00 EDT"),
        endtime: new Date("October 17, 2020 22:30:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Rangr Hour",
        type: "Speakers",
        starttime: new Date("October 16, 2020 21:00:00 EDT"),
        endtime: new Date("October 16, 2020 22:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Nicholas Walsh",
        type: "Speakers",
        starttime: new Date("October 16, 2020 23:00:00 EDT"),
        endtime: new Date("October 17, 2020 00:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Mr. Gary Brantley; CIO of Atlanta",
        type: "Speakers",
        starttime: new Date("October 17, 2020 11:00:00 EDT"),
        endtime: new Date("October 17, 2020 12:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Joy Harris",
        type: "Speakers",
        starttime: new Date("October 17, 2020 12:30:00 EDT"),
        endtime: new Date("October 17, 2020 13:30:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Adam Phillippy",
        type: "Speakers",
        starttime: new Date("October 17, 2020 14:00:00 EDT"),
        endtime: new Date("October 17, 2020 15:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Tim Aveni",
        type: "Speakers",
        starttime: new Date("October 17, 2020 16:00:00 EDT"),
        endtime: new Date("October 17, 2020 17:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
    {
        name: "Stone Librande",
        type: "Speakers",
        starttime: new Date("October 17, 2020 18:00:00 EDT"),
        endtime: new Date("October 17, 2020 19:00:00 EDT"),
        points: 20,
        url: "https://youtu.be/h69l98Nm_Ls"
    },
]
Event.insertMany(events) 


// event = createNew<IEvent>(Event, {
//     name: "NCR Sponsor Challenge",
//     type: "Tech Talk",
//     startime: new Date("October 16, 2020 19:30:00 EDT"),
//     endtime:new Date("October 16, 2020 20:00:00 EDT"),
//     points: 5,
//     meetingId: 891100086,
//     passcode: 2041,
// });