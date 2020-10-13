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
  {
    Name: "Intro to React",
    Points: 600,
    ID: 8196619129,
    Pass: 2177,
  },
  {
    Name: "Get to Know NCR",
    Points: 400,
    ID: 8196619102,
    Pass: 4282,
  },
  {
    Name: "Yoga with Microsoft",
    Points: 300,
    ID: 8196619118,
    Pass: 4112,
  },
  {
    Name: "Bob Ross Painting",
    Points: 400,
    ID: 163572978,
    Pass: 8443,
  },
];

for (let i = 0; i < workshops.length; i++) {
  var elem = document.createElement("div");

  var elemName = document.createElement("div");
  elemName.classList.add("workshop-name");

  var elemPoints = document.createElement("div");
  elemPoints.classList.add("workshop-points");

  elemName.innerHTML = workshops[i]["Name"];
  elemPoints.innerHTML = workshops[i]["Points"] + " Points";

  var idName = "workshop-" + (i + 1);

  elem.classList.add("workshop-elem");
  elem.id = idName;
  elem.append(elemName);
  elem.append(elemPoints);
  curr.append(elem);
}

/*
document
  .getElementById("workshops-list")
  .querySelectorAll(".workshop-elem")
  .forEach((item) =>
    item.addEventListener("click", function (event) {
      var name = event.target.innerHTML;
      for (let i = 0; i < workshops.length; i++) {
        if (workshops[i]["Name"] == name) {
          document.getElementById("id").value = workshops[i]["ID"];
          document.getElementById("joinLink").href =
            "https://bluejeans.com/" +
            workshops[i]["ID"] +
            "/" +
            workshops[i]["Pass"] +
            "/webrtc";
          document.getElementById("passCode").value = workshops[i]["Pass"];

          break;
        }
      }
    })
  );
*/

// document.getElementById("id").value = ;
// document.getElementById("passCode").value = 4681;
window.onload = function(){
  setTimeout(loadAfterTime, 5000);
};


function loadAfterTime() { 
  document.getElementById("joinMeeting").click();
}
