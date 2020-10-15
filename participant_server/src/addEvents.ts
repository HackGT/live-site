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