var openWorkshops = document.getElementById("open-workshops");
var curr = document.getElementById("workshops-list");
openWorkshops.addEventListener("click", function () {
  if (curr.style.display == "") {
    curr.style.display = "none";
  } else {
    curr.style.display = "";
  }
});

workshops = [
  { name: "NCR Design Workshop", points: "10" },
  { name: "Wayfair Tech Talk", points: "10" },
  { name: "IBM Tech Talk", points: "10" },
  { name: "NCR Sponsor Challenge", points: "10" },
  { name: "GM Tech Talk", points: "10" },
  { name: "Anthem Tech Talk", points: "10" },
  { name: "NSIN Tech Talk", points: "10" },
  { name: "Microsoft Tech Talk", points: "10" },
  { name: "Blackrock Tech Talk", points: "10" },

  { name: "Blackrock Mini Challenge", points: "5" },

  { name: "NCR Mini Challenge", points: "5" },
  { name: "NSIN Mini Challenge", points: "5" },
  { name: "Anthem Mini Challenge", points: "5" },
  { name: "Web Dev 1 Workshop / OFfice Hours", points: "15" },
  { name: "Prototype Workshop", points: "15" },
  { name: "App Dev Workshop 1 / Office Hours", points: "15" },
  { name: "App Dev Workshop 2 / Office Hours", points: "15" },
  { name: "Data Science Workshop 1 / Office Hours", points: "15" },
  { name: "Data Science Workshop 2 / Office Hours", points: "15" },
  { name: "Gaming and Graphics Workshop 1 / Office Hours", points: "15" },
  { name: "Gaming and Graphics Workshop 2 / Office Hours", points: "15" },

  { name: "Web Dev 3 Workshop / Office Hours", points: "15" },
  { name: "App Dev 3 Workshop / Office Hours", points: "15" },
  { name: "Data Science 3 Workshop / Office Hours", points: "15" },
  { name: "NCR - Pillow Fort", points: "20" },
  { name: "Anthem - Community Hangout", points: "20" },
  { name: "Wayfair - Scavenger Hunt", points: "20" },
  { name: "GM - Typing Speed Racer", points: "20" },
  { name: "IBM - Among Us Personalization", points: "20" },
  { name: "BlackRock - The Wiki Game", points: "20" },
  { name: "Microsoft - Yoga", points: "20" },
  { name: "NSIN - Codenames", points: "20" },
  { name: "MLH - Werewolf", points: "20" },
  { name: "MLH - CTF", points: "20" },
  { name: "Opening Ceremonies", points: "20" },
  { name: "Web Dev 2 Workshop", points: "15" },
  { name: "HackGT Organizer Panel", points: "20" },
  { name: "Rangr Hour", points: "20" },
  { name: "Nicholas Walsh", points: "20" },
  { name: "Mr. Gary Brantley; CIO of Atlanta", points: "20" },
  { name: "Joy Harris", points: "20" },
  { name: "Adam Phillippy", points: "20" },

  { name: "Tim Aveni", points: "20" },
  { name: "Stone Librande", points: "20" },
  { name: "Closing Ceremonies", points: "20" },
];

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

var curr_workshop = document.getElementById("workshop-0");
var selected = workshops[0]["name"];
let workshop_desc = document.getElementById("description");
workshop_desc.innerHTML = selected;

document
  .getElementById("workshops-list")
  .querySelectorAll(".workshop-elem")
  .forEach((item) =>
    item.addEventListener("click", function (event) {
      curr_workshop = event.target;
      selected = curr_workshop.textContent;
      for (let j = 0; j < workshops.length; j++) {
        if (workshops[j]["name"] == event.target.textContent) {
          let workshop_desc = document.getElementById("description");
          workshop_desc.innerHTML = workshops[j]["name"];
          break;
        }
      }
    })
  );

// Fetching all the user data from MongoDB to render information on dashboard
var uuid = "";
let points = 0;
var user_events = [];
var query = `query($uuid: String!) {
    user(uuid: $uuid) {
      name,      
      points,
      userevents { event, point }
    }
  }`;
fetch("http://localhost:3000/graphql", {
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
      var points = workshop["points"];
      for (let k = 0; k < user_events.length; k++) {
        if (user_events[k]["event"] == workshop["name"]) {    
          points = user_events[k]["point"];
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
  })
  .catch((err) => console.log(err));

// Join Event Button
let button = document.getElementById("joinMeeting");
button.addEventListener("click", function () {
  // Modify the user's obtained points for that event
  var uuid = "";
  let points = 0;
  let event_name = selected;
  var query = `mutation($uuid: String!, $points: Int!, $event_name: String!) {
    modify_user_event(uuid: $uuid, points: $points, event_name: $event_name) {
      points
    }
  }`;
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables: { uuid, points, event_name } }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      // Fetch the BlueJeans event link
      query = `query($event_name: String!) {
        event(event_name: $event_name) {
          url
        }
      }`;
      fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query, variables: { event_name } }),
      })
        .then((r) => r.json())
        .then((data) => {
          document.getElementById("joinLink").href =
            data["data"]["event"]["url"];
          document.getElementById("joinLink").click();
        });
    })
    .catch((err) => console.log(err));
});
