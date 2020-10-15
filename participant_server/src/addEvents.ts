import { createNew, IEvent, Event, IEventMongoose} from "./schema";



// createNew<IEvent>(Event, {

// })
// 
// let events: IEvent[] = [{
//     name: "NCR Sponsor Challenge",
//     type: "Tech Talk",
//     startime: new Date("October 16, 2020 19:30:00"),
//     endtime:new Date("October 16, 2020 20:00:00"),
//     // times: {new Date("October 16, 2020 19:30:00"), new Date("October 16, 2020 20:00:00")},
//     points: 5,
//     meetingID: 891100086,
//     passcode: 2041
// }]


let events: IEvent[] = [
    {
        // _id: 12345,
        name: "NCR Sponsor Challenge",
        type: "Tech Talk",
        starttime: new Date("October 16, 2020 19:30:00"),
        endtime: new Date("October 16, 2020 20:00:00"),
        points: 10,
        url: "https://bluejeans.com/891100086",
    },
    {
        name: "NCR Design Workshop",
        type: "Tech Talk",
        starttime: new Date("October 16, 2020 20:30:00"),
        endtime: new Date("October 16, 2020 21:30:00"),
        points: 10,
        url: "https://bluejeans.com/398545345",
    },
    {
        name: "Wayfair Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 10:30:00"),
        endtime: new Date("October 17, 2020 11:00:00"),
        points: 10,
        url: "https://bluejeans.com/340471228"
    },
    {
        name: "IBM Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 12:00:00"),
        endtime: new Date("October 17, 2020 12:30:00"),
        points: 10,
        url: "https://bluejeans.com/129937416"
    },
    {
        name: "GM Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 12:30:00"),
        endtime: new Date("October 17, 2020 13:00:00"),
        points: 10,
        url: "https://bluejeans.com/148778069"
    },
    {
        name: "Anthem Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 13:30:00"),
        endtime: new Date("October 17, 2020 14:00:00"),
        points: 10,
        url: "https://bluejeans.com/764810459"
    },
    {
        name: "NSIN Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 15:00:00"),
        endtime: new Date("October 17, 2020 15:30:00"),
        points: 10,
        url: "https://bluejeans.com/201156086"
    },
    {
        name: "Microsoft Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 17:00:00"),
        endtime: new Date("October 17, 2020 17:30:00"),
        points: 10,
        url: "https://bluejeans.com/735730043"
    },
    {
        name: "Blackrock Tech Talk",
        type: "Tech Talk",
        starttime: new Date("October 17, 2020 17:30:00"),
        endtime: new Date("October 17, 2020 18:00:00"),
        points: 10,
        url: "https://bluejeans.com/797564259"
    },
    {
        name: "Blackrock Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 16, 2020 22:00:00"),
        endtime: new Date("October 16, 23:00:00"),
        points: 5,
        url: "https://bluejeans.com/568823688"
    },
    {
        name: "Anthem Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 11:30:00"),
        endtime: new Date("October 17, 12:30:00"),
        points: 5,
        url: "https://bluejeans.com/626750528"
    },
    {
        name: "NCR Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 15:30:00"),
        endtime: new Date("October 17, 16:30:00"),
        points: 5,
        url: "https://bluejeans.com/732170726"
    },
    {
        name: "NSIN Mini Challenge",
        type: "Mini Challenge",
        starttime: new Date("October 17, 2020 16:30:00"),
        endtime: new Date("October 17, 17:30:00"),
        points: 5,
        url: "https://bluejeans.com/825086141"
    },
    {
        name: "Web Dev 1 Workshop / OFfice Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00"),
        endtime: new Date("October 16, 22:00:00"),
        points: 15,
        url: "https://bluejeans.com/693811111"
    },
    {
        name: "Web Dev 2 Workshop",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 22:00:00"),
        endtime: new Date("October 16, 23:00:00"),
        points: 15,
        url: "https://bluejeans.com/613306731"
    },
    {
        name: "Prototype Workshop",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 23:00:00"),
        endtime: new Date("October 17, 12:00:00"),
        points: 15,
        url: "https://bluejeans.com/683549242"
    },
    {
        name: "App Dev Workshop 1 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00"),
        endtime: new Date("October 16, 22:00:00"),
        points: 15,
        url: "https://bluejeans.com/492994741"
    },
    {
        name: "App Dev Workshop 2 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 22:00:00"),
        endtime: new Date("October 17, 00:00:00"),
        points: 15,
        url: "https://bluejeans.com/894804876"
    },
    {
        name: "Data Science Workshop 1 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00"),
        endtime: new Date("October 16, 22:00:00"),
        points: 15,
        url: "https://bluejeans.com/136170629"
    },
    {
        name: "Data Science Workshop 2 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 22:00:00"),
        endtime: new Date("October 17, 00:00:00"),
        points: 15,
        url: "https://bluejeans.com/847022760"
    },
    {
        name: "Gaming and Graphics Workshop 1 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 16, 2020 20:00:00"),
        endtime: new Date("October 16, 22:00:00"),
        points: 15,
        url: "https://bluejeans.com/978047451"
    },
    {
        name: "Gaming and Graphics Workshop 2 / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00"),
        endtime: new Date("October 17, 12:00:00"),
        points: 15,
        url: "https://bluejeans.com/489296217"
    },
    {
        name: "Web Dev 3 Workshop / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00"),
        endtime: new Date("October 17, 12:00:00"),
        points: 15,
        url: "https://bluejeans.com/919084003"
    },
    {
        name: "App Dev 3 Workshop / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00"),
        endtime: new Date("October 17, 12:00:00"),
        points: 15,
        url: "https://bluejeans.com/545457659"
    },
    {
        name: "Data Science 3 Workshop / Office Hours",
        type: "Emerging Workshop",
        starttime: new Date("October 17, 2020 10:00:00"),
        endtime: new Date("October 17, 12:00:00"),
        points: 15,
        url: "https://bluejeans.com/823880646"
    },
]
Event.insertMany(events) 


// event = createNew<IEvent>(Event, {
//     name: "NCR Sponsor Challenge",
//     type: "Tech Talk",
//     startime: new Date("October 16, 2020 19:30:00"),
//     endtime:new Date("October 16, 2020 20:00:00"),
//     points: 5,
//     meetingId: 891100086,
//     passcode: 2041,
// });