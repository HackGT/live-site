// if (!user) {
//             user = createNew<IUser>(User, { ...profile });
//             user.points = 0;
//         } else {
//             user.token = accessToken;
//         }
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


let events: IEvent[] = [{
    name: "NCR Sponsor Challenge",
    type: "Tech Talk",
    startime: new Date("October 16, 2020 19:30:00"),
    endtime:new Date("October 16, 2020 20:00:00"),
    points: 5,
    meetingID: 891100086,
    passcode: 2041,
}]
Event.insertMany(events)