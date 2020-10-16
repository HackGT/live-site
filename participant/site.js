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

for (let j = 0; j < workshops.length; j++) {
  let workshop = workshops[j];
  var elem = document.createElement("div");

  var elemName = document.createElement("div");
  elemName.classList.add("workshop-name");

  var elemPoints = document.createElement("div");
  elemPoints.classList.add("workshop-points");
  elemName.innerHTML = workshop["name"];
  elemPoints.innerHTML = workshop["points"];

  var idName = "workshop-" + j;

  elem.classList.add("workshop-elem");
  elem.id = idName;
  elem.append(elemName);
  elem.append(elemPoints);
  curr.append(elem);
}

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

var selected = workshops[0]["name"];
let workshop_desc = document.getElementById("description");
workshop_desc.innerHTML = selected;

document
  .getElementById("workshops-list")
  .querySelectorAll(".workshop-elem")
  .forEach((item) =>
    item.addEventListener("click", function (event) {
      selected = event.target.textContent;
      for (let j = 0; j < workshops.length; j++) {
        if (workshops[j]["name"] == event.target.textContent) {
          let workshop_desc = document.getElementById("description");
          workshop_desc.innerHTML = workshops[j]["name"];
          break;
        }
      }
    })
  );

// Fetching all the data from MongoDB to render information on dashboard
/*
var uuid = "";
var query = `query($uuid: String!) {
    user(uuid: $uuid) {
      name,      
      points
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
    console.log(data);
    var user_name = data["data"]["user"]["name"];
    document.getElementById("username").innerHTML = user_name;
    var points = data["data"]["user"]["points"];
    document.getElementById("open-workshops").innerHTML = points + " Points";
  });
  */

let uuid = "4f738605-089e-4838-91a8-522a47f9e1f6";
let points = 0;
// var mutation = "hello";
/*
var query = `mutation {
  modify_user(uuid: "4f738605-089e-4838-91a8-522a47f9e1f6", points: 0) {

    points
  }
}`;
fetch("http://localhost:3000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({ query, variables: { uuid, points } }),
})
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
  });
*/

// Join Event Button
let button = document.getElementById("joinMeeting");
button.addEventListener("click", function () {
  var event_name = document.getElementById("event_name");
  event_name.value = selected;
  var query = `mutation {
    modify_user(uuid: "4f738605-089e-4838-91a8-522a47f9e1f6", points: 0) {
  
      points
    }
  }`;
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables: { uuid, points } }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
  // var submit = document.getElementById("submit");
  // document.getElementById("joinLink").click();
  // submit.click();

  /*
  var uuid = "4f738605-089e-4838-91a8-522a47f9e1f6";
  var points = 0;
  var mutation = `mutation($uuid: String!, $points: Int!) {
    modify_user(uuid: $uuid, points: $points) {
      name,
      points,
    }
  }`;
  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ mutation, variables: { uuid, points } }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });
    */
});

console.log(JSON.stringify(selected));
/*
async function fetchMoviesJSON() {
  const response = await fetch("http://localhost:3000/clicked", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: selected }),
  });
  return response.json();
}
*/
