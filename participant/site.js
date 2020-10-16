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
  { name: "10 Things Every Hacker Needs to Know About Design", points: "10" },
  { name: "Augmented Reality for Apps", points: "10" },
  { name: "IBM Tech Talk", points: "10" },
  { name: "Getting to Know NCR APIs", points: "10" },
  { name: "Network Analysis and Graphical Databases", points: "10" },
  { name: "Life at NSIN", points: "10" },
  { name: "Deploy React, Angular and Vue apps with Azure Static Web Apps", points: "10" },
  { name: "Story of Aladdin", points: "10" },

  { name: "Blackrock Mini Challenge", points: "5" },
  { name: "NCR Mini Challenge", points: "5" },
  { name: "NSIN Mini Challenge", points: "5" },
  { name: "Anthem Mini Challenge", points: "5" },
  
  { name: "Web Dev 1 Workshop", points: "15" },
  { name: "Prototype Workshop", points: "15" },
  { name: "Android App Dev Workshop 1", points: "15" },
  { name: "iOS App Dev Workshop 1", points: "15" },
  { name: "Data Science Workshop 1", points: "15" },
  { name: "Data Science Workshop 2", points: "15" },
  { name: "Gaming and Graphics Workshop 1", points: "15" },
  { name: "Gaming and Graphics Workshop 2", points: "15" },
  { name: "Web Dev 3 Workshop", points: "15" },
  { name: "Android App Dev Workshop 2", points: "15" },
  { name: "Data Science 3 Workshop", points: "15" },
  
  { name: "NCR - Pillow Fort", points: "20" },
  { name: "Anthem - Community Hangout", points: "20" },
  { name: "Wayfair - Codenames", points: "20" },
  { name: "GM - Typing Speed Racer", points: "20" },
  { name: "IBM - Among Us Personalization", points: "20" },
  { name: "BlackRock Series", points: "20" },
  { name: "Microsoft - Yoga", points: "20" },
  { name: "NSIN - Scavenger Hunt", points: "20" },
  { name: "MLH - Werewolf", points: "20" },
  { name: "MLH - CTF", points: "20" },
  
  { name: "Opening Ceremonies", points: "20" },
  { name: "Web Dev 2 Workshop", points: "15" },
  { name: "HackGT Organizer Panel", points: "20" },
  { name: "Rangr Hour", points: "20" },
  { name: "Nicholas Walsh", points: "20" },
  { name: "Gary Brantley, City of Atlanta CIO", points: "20" },
  { name: "Joy Harris", points: "20" },
  { name: "Adam Phillippy", points: "20" },

  { name: "Tim Aveni", points: "20" },
  { name: "Stone Librande", points: "20" },
  { name: "Closing Ceremonies", points: "20" },
];

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

// Fetching description data from CMS
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
      descriptions.push(name_desc);
    }
  })
  .catch((err) => console.log(err));

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
fetch(link+"/graphql", {
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
    console.log(data);
    var user_name = data["data"]["user"]["name"];
    document.getElementById("username").innerHTML = user_name;
    var points = data["data"]["user"]["points"];
    document.getElementById("open-workshops").innerHTML = points + " Points";

    // Load the workshops onto the dashboard
    user_events = data["data"]["user"]["userevents"];
    for (let j = 0; j < workshops.length; j++) {
      let workshop = workshops[j];
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
  fetch(link+"/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables: { uuid, event_name } }),
  })
    .then((r) => r.json())
    .then((data) => {
      if (data["data"]["modify_user_event"] != null) {
        // Fetch the BlueJeans event link
        query = `query($event_name: String!) {
        event(event_name: $event_name) {
          url
        }
      }`;
        fetch(link+"/graphql", {
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
            joinLink.href = data["data"]["event"]["url"];
            joinLink.click();
          });
      }
    })
    .catch((err) => console.log(err));
});
