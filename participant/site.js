// Create the workshops button for rendering the list
var openWorkshops = document.getElementById("open-workshops");
var curr = document.getElementById("workshops-list");
openWorkshops.addEventListener("click", function () {
  if (curr.style.display == "") {
    curr.style.display = "none";
  } else {
    curr.style.display = "";
  }
});
var link = "";
// var port =process.env.PORT || 3000;
// var isProduction = process.env.ISPRODUCTION || false;
// if (isProduction)
// {
//   link = "https://calls.hack.gt";
// }
// else {
//   link = "http://localhost:"+port;
// }
// List of workshops with names and points
workshops = [
  {
    name: "10 Things Every Hacker Needs to Know About Design",
    points: "10",
    date: new Date("October 16, 2020 20:30:00 EDT"),
  },
  {
    name: "Augmented Reality for Apps",
    points: "10",
    date: new Date("October 17, 2020 10:30:00 EDT"),
  },
  {
    name: "IBM Tech Talk",
    points: "10",
    date: new Date("October 17, 2020 12:00:00 EDT"),
  },
  {
    name: "Getting to Know NCR APIs",
    points: "10",
    date: new Date("October 16, 2020 20:30:00 EDT"),
  },
  {
    name: "Network Analysis and Graphical Databases",
    points: "10",
    date: new Date("October 17, 2020 13:30:00 EDT"),
  },
  {
    name: "Life at NSINk",
    points: "10",
    date: new Date("October 17, 2020 15:00:00 EDT"),
  },
  {
    name: "Deploy React, Angular and Vue apps with Azure Static Web Apps",
    points: "10",
    date: new Date("October 17, 2020 17:00:00 EDT"),
  },
  {
    name: "Story of Aladdin",
    points: "10",
    date: new Date("October 17, 2020 17:30:00 EDT"),
  },

  {
    name: "Blackrock Mini Challenge",
    points: "5",
    date: new Date("October 16, 2020 22:00:00 EDT"),
  },
  {
    name: "NCR Mini Challenge",
    points: "5",
    date: new Date("October 17, 2020 15:30:00 EDT"),
  },
  {
    name: "NSIN Mini Challenge",
    points: "5",
    date: new Date("October 17, 2020 16:30:00 EDT"),
  },
  {
    name: "Anthem Mini Challenge",
    points: "5",
    date: new Date("October 17, 2020 11:30:00 EDT"),
  },
  {
    name: "GM Mini Challenge",
    points: "5",
    date: new Date("October 17, 2020 13:00:00 EDT"),
  },

  {
    name: "Web Dev 1 Workshop",
    points: "15",
    date: new Date("October 16, 2020 20:00:00 EDT"),
  },

  {
    name: "Prototype Workshop",
    points: "15",
    date: new Date("October 16, 2020 23:00:00 EDT"),
  },
  {
    name: "Android App Dev Workshop 1",
    points: "15",
    date: new Date("October 16, 2020 20:00:00 EDT"),
  },
  {
    name: "iOS App Dev Workshop 1",
    points: "15",
    date: new Date("October 16, 2020 22:00:00 EDT"),
  },
  {
    name: "Data Science Workshop 1",
    points: "15",
    date: new Date("October 16, 2020 20:00:00 EDT"),
  },
  {
    name: "Data Science Workshop 2",
    points: "15",
    date: new Date("October 16, 2020 22:00:00 EDT"),
  },
  {
    name: "Gaming and Graphics Workshop 1",
    points: "15",
    date: new Date("October 16, 2020 20:00:00 EDT"),
  },
  {
    name: "Gaming and Graphics Workshop 2",
    points: "15",
    date: new Date("October 17, 2020 10:00:00 EDT"),
  },
  {
    name: "Web Dev 3 Workshop",
    points: "15",
    date: new Date("October 17, 2020 10:00:00 EDT"),
  },
  {
    name: "Android App Dev Workshop 2",
    points: "15",
    date: new Date("October 17, 2020 10:00:00 EDT"),
  },
  {
    name: "Data Science 3 Workshop",
    points: "15",
    date: new Date("October 17, 2020 10:00:00 EDT"),
  },

  {
    name: "NCR - Pillow Fort",
    points: "20",
    date: new Date("October 16, 2020 20:30:00 EDT"),
  },
  {
    name: "Anthem - Community Hangout",
    points: "20",
    date: new Date("October 17, 2020 01:00:00 EDT"),
  },
  {
    name: "Wayfair - Codenames",
    points: "20",
    date: new Date("October 17, 2020 11:00:00 EDT"),
  },
  {
    name: "GM - Typing Speed Racer",
    points: "20",
    date: new Date("October 17, 2020 13:00:00 EDT"),
  },
  {
    name: "IBM - Among Us Personalization",
    points: "20",
    date: new Date("October 17, 2020 14:30:00 EDT"),
  },
  {
    name: "BlackRock Series",
    points: "20",
    date: new Date("October 17, 2020 16:00:00 EDT"),
  },
  {
    name: "Microsoft - Yoga",
    points: "20",
    date: new Date("October 17, 2020 18:00:00 EDT"),
  },
  {
    name: "NSIN - Scavenger Hunt",
    points: "20",
    date: new Date("October 17, 2020 19:30:00 EDT"),
  },
  {
    name: "MLH - Werewolf",
    points: "20",
    date: new Date("October 18, 2020 00:00:00 EDT"),
  },
  {
    name: "MLH - CTF",
    points: "20",
    date: new Date("October 18, 2020 13:00:00 EDT"),
  },

  {
    name: "Opening Ceremonies",
    points: "20",
    date: new Date("October 16, 2020 17:00:00 EDT"),
  },
  {
    name: "Web Dev 2 Workshop",
    points: "15",
    date: new Date("October 16, 2020 22:00:00 EDT"),
  },
  {
    name: "HackGT Organizer Panel",
    points: "20",
    date: new Date("October 17, 2020 22:00:00 EDT"),
  },
  {
    name: "Rangr Hour",
    points: "20",
    date: new Date("October 16, 2020 21:00:00 EDT"),
  },
  {
    name: "Nicholas Walsh",
    points: "20",
    date: new Date("October 16, 2020 23:00:00 EDT"),
  },
  {
    name: "Gary Brantley, City of Atlanta CIO",
    points: "20",
    date: new Date("October 17, 2020 11:00:00 EDT"),
  },
  {
    name: "Joy Harris",
    points: "20",
    date: new Date("October 17, 2020 12:30:00 EDT"),
  },
  {
    name: "Adam Phillippy",
    points: "20",
    date: new Date("October 17, 2020 14:00:00 EDT"),
  },

  {
    name: "Tim Aveni",
    points: "20",
    date: new Date("October 17, 2020 16:00:00 EDT"),
  },
  {
    name: "Stone Librande",
    points: "20",
    date: new Date("October 17, 2020 18:00:00 EDT"),
  },
  {
    name: "Closing Ceremonies",
    points: "20",
    date: new Date("October 18, 2020 15:30:00 EDT"),
  },
];

/*
// Shows local video
var video = document.querySelector("#localVideo");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
*/

// Fetching description data from CMS
/*
var descriptions = [];
const CMS_ENDPOINT = "https://cms.hack.gt/admin/api";
var query = `{
  allEvents 
  { 
    name, 
    description,
    startDay,
    startTime,
    endTime,
    type {
      name
    },
    tags {
      name
    }
  }
}`;

fetch(CMS_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ query: query }),
})
  .then((r) => r.json())
  .then((data) => {
    var cms_desc = data["data"]["allEvents"];
    for (let i = 0; i < cms_desc.length; i++) {
      var day = cms_desc[i].startDay;
      var desc_day = "";
      if (day.substring(day.length - 2) == "16") {
        desc_day = "Friday";
      } else if (day.substring(day.length - 2) == "17") {
        desc_day = "Saturday";
      } else {
        desc_day = "Sunday";
      }

      var start = cms_desc[i].startTime;
      var actual_start = start;
      if (start.substring(0, 1) == "0") {
        start = start.substring(1);
      }
      var end = cms_desc[i].endTime;
      if (end.substring(0, 1) == "0") {
        end = end.substring(1);
      }
      var name_desc = {
        name: cms_desc[i].name,
        desc: cms_desc[i].description,
        startDay: desc_day,
        startTime: start,
        endTime: end,
        type: cms_desc[i].type,
        tags: cms_desc[i].tags,
      };
      var date_string = day + " " + actual_start.substr(0, 5);
      for (let j = 0; j < workshops.length; j++) {
        if (workshops[j]["name"] == cms_desc[i].name) {  
          workshops[j][date] = new Date(date_string);          
          break;
        }        
      }       
      descriptions.push(name_desc);
    }
  })
  .catch((err) => console.log(err));
*/

// Fetching all the user data from MongoDB to render information on dashboard
var selected = "NCR Design Workshop";
var uuid = "";
let points = 0;
var user_events = [];
query = `query($uuid: String!) {
    user(uuid: $uuid) {
      name,      
      points,
      userevents { event, points }
    }
  }`;
// console.log(link+"/graphql");
fetch(link + "/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ query, variables: { uuid } }),
})
  .then((r) => r.json())
  .then((data) => {
    // Set up the user's name and points
    var user_name = data["data"]["user"]["name"];
    document.getElementById("username").innerHTML = user_name;
    var points = data["data"]["user"]["points"];
    document.getElementById("open-workshops").innerHTML = points + " Points";
    user_events = data["data"]["user"]["userevents"];

    var descriptions = [];
    const CMS_ENDPOINT = "https://cms.hack.gt/admin/api";
    var query = `{
  allEvents 
  { 
    name, 
    description,
    startDay,
    startTime,
    endTime,
    type {
      name
    },
    tags {
      name
    }
  }
}`;

    fetch(CMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: query }),
    })
      .then((r) => r.json())
      .then((data2) => {
        var cms_desc = data2["data"]["allEvents"];
        for (let i = 0; i < cms_desc.length; i++) {
          var day = cms_desc[i].startDay;
          var desc_day = "";
          if (day.substring(day.length - 2) == "16") {
            desc_day = "Friday";
          } else if (day.substring(day.length - 2) == "17") {
            desc_day = "Saturday";
          } else {
            desc_day = "Sunday";
          }

          var start = cms_desc[i].startTime;
          var actual_start = start;
          if (start.substring(0, 1) == "0") {
            start = start.substring(1);
          }
          var end = cms_desc[i].endTime;
          if (end.substring(0, 1) == "0") {
            end = end.substring(1);
          }
          var name_desc = {
            name: cms_desc[i].name,
            desc: cms_desc[i].description,
            startDay: desc_day,
            startTime: start,
            endTime: end,
            type: cms_desc[i].type,
            tags: cms_desc[i].tags,
          };
          var date_string = day + " " + actual_start.substr(0, 5);
          for (let j = 0; j < workshops.length; j++) {
            if (workshops[j]["name"] == cms_desc[i].name) {
              if (workshops[j]["name"] == "Getting to Know NCR APIs") {
                // console.log(new Date(date_string));
              }
              workshops[j]["date"] = new Date(date_string);
              break;
            }
          }
          descriptions.push(name_desc);
        }
        // Sort and Load the workshops onto the dashboard
        workshops.sort(function (a, b) {
          return a.date - b.date;
        });
        for (let j = 0; j < workshops.length; j++) {
          let workshop = workshops[j];
          var name = workshop["name"];
          var points = "";
          if (name == "Opening Ceremonies") {
            points = "20";            
          }
          for (let k = 0; k < user_events.length; k++) {
            if (user_events[k]["event"] == workshop["name"]) {
              points = user_events[k]["points"];
              break;
            }
          }
          var elem = document.createElement("div");

          var elemName = document.createElement("div");
          elemName.classList.add("workshop-name");

          var elemPoints = document.createElement("div");
          elemPoints.classList.add("workshop-points");
          elemName.innerHTML = name;
          elemPoints.innerHTML = points;

          var idName = "workshop-" + j;

          elem.classList.add("workshop-elem");
          elem.id = idName;
          elem.append(elemName);
          elem.append(elemPoints);
          curr.append(elem);
        }

        // Adds event handlers for each workshop to update description when pressed
        var curr_workshop = document.getElementById("workshop-0");
        selected = workshops[0]["name"];
        let workshop_desc = document.getElementById("description");
        workshop_desc.innerHTML = selected;
        document
          .getElementById("workshops-list")
          .querySelectorAll(".workshop-elem")
          .forEach((item) => {
            item.addEventListener("click", function (event) {
              curr_workshop = event.target;
              selected = curr_workshop.textContent;
              for (let j = 0; j < workshops.length; j++) {
                let workshop = workshops[j];
                if (workshop["name"] == curr_workshop.textContent) {
                  // Find the correct description
                  let flag = false;
                  let desc_title = document.getElementById("desc-title");
                  desc_title.innerHTML = workshop["name"];
                  for (let k = 0; k < descriptions.length; k++) {
                    if (descriptions[k]["name"].includes(workshop["name"])) {
                      let workshop_desc = document.getElementById(
                        "description"
                      );
                      let desc_type = document.getElementById("desc-type");
                      let desc_date = document.getElementById("desc-date");

                      workshop_desc.innerHTML = descriptions[k]["desc"];
                      desc_type.innerHTML = descriptions[k]["type"]["name"];
                      desc_date.innerHTML =
                        descriptions[k]["startDay"] +
                        ", " +
                        descriptions[k]["startTime"] +
                        "-" +
                        descriptions[k]["endTime"];
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    workshop_desc.innerHTML =
                      workshop["name"] + " description not available.";
                  }
                  break;
                }
              }
            });
          });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
/*
    // Sort and Load the workshops onto the dashboard
    workshops.sort(function (a, b) {
      return a.date - b.date;
    });
    for (let j = 0; j < workshops.length; j++) {      
      let workshop = workshops[j];
      // console.log(workshop["date"]);
      if (workshop["name"] == "Getting to Know NCR APIs") {
        console.log(workshops[j - 1]["name"]);
        console.log(workshop["name"]);
        console.log(workshops[j - 1]["date"]);
        console.log(workshop["date"]);
      }
      var name = workshop["name"];
      var points = "";
      for (let k = 0; k < user_events.length; k++) {
        if (user_events[k]["event"] == workshop["name"]) {
          points = user_events[k]["points"];
          break;
        }
      }
      var elem = document.createElement("div");

      var elemName = document.createElement("div");
      elemName.classList.add("workshop-name");

      var elemPoints = document.createElement("div");
      elemPoints.classList.add("workshop-points");
      elemName.innerHTML = name;
      elemPoints.innerHTML = points;

      var idName = "workshop-" + j;

      elem.classList.add("workshop-elem");
      elem.id = idName;
      elem.append(elemName);
      elem.append(elemPoints);
      curr.append(elem);
    }

    // Adds event handlers for each workshop to update description when pressed
    var curr_workshop = document.getElementById("workshop-0");
    selected = workshops[0]["name"];
    let workshop_desc = document.getElementById("description");
    workshop_desc.innerHTML = selected;
    document
      .getElementById("workshops-list")
      .querySelectorAll(".workshop-elem")
      .forEach((item) => {
        item.addEventListener("click", function (event) {
          curr_workshop = event.target;
          selected = curr_workshop.textContent;
          for (let j = 0; j < workshops.length; j++) {
            let workshop = workshops[j];
            if (workshop["name"] == curr_workshop.textContent) {
              // Find the correct description
              let flag = false;
              let desc_title = document.getElementById("desc-title");
              desc_title.innerHTML = workshop["name"];
              for (let k = 0; k < descriptions.length; k++) {
                if (descriptions[k]["name"].includes(workshop["name"])) {
                  let workshop_desc = document.getElementById("description");
                  let desc_type = document.getElementById("desc-type");
                  let desc_date = document.getElementById("desc-date");

                  workshop_desc.innerHTML = descriptions[k]["desc"];
                  desc_type.innerHTML = descriptions[k]["type"]["name"];
                  desc_date.innerHTML =
                    descriptions[k]["startDay"] +
                    ", " +
                    descriptions[k]["startTime"] +
                    "-" +
                    descriptions[k]["endTime"];
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                workshop_desc.innerHTML =
                  workshop["name"] + " description not available.";
              }
              break;
            }
          }
        });
      });
  })
  .catch((err) => console.log(err));
  */

// Join Event Button
let button = document.getElementById("joinMeeting");
button.addEventListener("click", function () {
  // Modify the user's obtained points for that event
  var uuid = "";
  let event_name = selected;
  var query = `mutation($uuid: String!, $event_name: String!) {
    modify_user_event(uuid: $uuid, event_name: $event_name) {
      points
    }
  }`;
  fetch(link + "/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables: { uuid, event_name } }),
  })
    .then((r) => r.json())
    .then((data) => {
      // console.log(data);
      // if (data["data"]["modify_user_event"] != null) {
        // Fetch the BlueJeans event link
        query = `query($event_name: String!) {
        event(event_name: $event_name) {
          url
        }
      }`;
        fetch(link + "/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query, variables: { event_name } }),
        })
          .then((r) => r.json())
          .then((data) => {
            let joinLink = document.getElementById("joinLink");
            let link = document.getElementById("joinMeeting");
            link.innerHTML = "Joining Event";
            joinLink.href = data["data"]["event"]["url"];
            joinLink.click();            
            location.reload();
          });
      // } else {
      //   let link = document.getElementById("joinMeeting");
      //   link.innerHTML = "Cannot Join";
      // }
    })
    .catch((err) => console.log(err));
});