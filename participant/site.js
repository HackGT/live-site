var openWorkshops = document.getElementById("open-workshops");
var curr = document.getElementById("workshops-list");
openWorkshops.addEventListener("click", function () {
  if (curr.style.display == "") {
    curr.style.display = "none";
  } else {
    curr.style.display = "";
  }
});

workshops = {
  Emerging_Workshops: [
    15,
    {
      Name: "Web Dev 1 Workshop / OH",
      Link: "https://bluejeans.com/693811111",
    },
  ],
  Mini_Challenges: [
    20,
    {
      Name: "Blackrock",
      Link: "https://bluejeans.com/568823688",
    },
  ],
  Tech_Talks: [
    10,
    {
      Name: "NCR Sponsor Challenge",
      Link: "https://bluejeans.com/891100086",
    },
  ],
};

let wti = 0;
for (workshop_type in workshops) {
  let workshop_data = workshops[workshop_type];
  for (let j = 1; j < workshop_data.length; j++) {
    let workshop = workshop_data[j];
    var elem = document.createElement("div");

    var elemName = document.createElement("div");
    elemName.classList.add("workshop-name");

    var elemPoints = document.createElement("div");
    elemPoints.classList.add("workshop-points");
    elemName.innerHTML = workshop["Name"];
    elemPoints.innerHTML = workshop_data[0];

    var idName = "workshop-" + wti + j;

    elem.classList.add("workshop-elem");
    elem.id = idName;
    elem.append(elemName);
    elem.append(elemPoints);
    curr.append(elem);
  }
  wti++;
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

var workshop_values = Object.values(workshops);
var selected = workshop_values[0][1]["Name"];
let workshop_desc_init = document.getElementById("description");
workshop_desc_init.innerHTML = selected;
document.getElementById("joinLink").href = workshop_values[0][1]["Link"];

document
  .getElementById("workshops-list")
  .querySelectorAll(".workshop-elem")
  .forEach((item) =>
    item.addEventListener("click", function (event) {
      let flag = false;
      selected = event.target.textContent;
      for (workshop_type in workshops) {
        let workshop_data = workshops[workshop_type];
        for (let j = 1; j < workshop_data.length; j++) {
          let workshop = workshop_data[j];
          if (workshop["Name"] == event.target.textContent) {
            document.getElementById("joinLink").href = workshop["Link"];
            let workshop_desc = document.getElementById("description");
            workshop_desc.innerHTML = workshop["Name"];
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
    })
  );

let button = document.getElementById("joinMeeting");
button.addEventListener("click", function () {
  var event_name = document.getElementById("event_name");
  event_name.value = selected;
  var submit = document.getElementById("submit");
  document.getElementById("joinLink").click();
  submit.click();
});
