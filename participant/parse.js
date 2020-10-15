const fs = require("fs");

fs.writeFile("workshops.txt", "[", (err) => { if (err) throw err; });
for (let i = 0; i < workshops.length; i++) {
    let string = "{ " + "name: \"" + workshops[i]["name"] + "\", " + "points: \"" + workshops[i]["points"] + "\" },";
    fs.appendFile("workshops.txt", string, (err) => {
        if (err) throw err;
    });
    fs.appendFile("workshops.txt", "\n", (err) => {
        if (err) throw err;
    })
}
fs.appendFile("workshops.txt", "]", (err) => { if (err) throw err; });
