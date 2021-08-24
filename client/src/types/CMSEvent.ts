export type CMSEVent = {
  id: string;
  name: string;
  startData?: string;
  endDate?: string;
  description: string;
};

// var query =  
//   `{
//     allEvents  (where: {AND:[
//         {startDate_gt: "2021-03-13T00:00:00.000Z"},
//         {endDate_lt: "2021-03-14T21:00:00.000Z"}
//       ]}, orderBy:"startDate") {
//       id
//       name
//       startDate
//       endDate
//       description
//       type {
//           name
//           points
//       }
//       url
//     }
//   }
//   `;