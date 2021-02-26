const fs = require("fs");
const fetch = require("node-fetch");

const names = fs.readFileSync('names.txt').toString().split("\n");

const CURRENT_EVENT = {
    id: "23423", // Should be CMS Mongo ID for event
    name: "Name",
    type: {
        points: 20
    }
}
const REGISTRATION_AUTH = "";
const CALLS_AUTH = "";

const checkNames = async () => {
    let updatedNames = [];
    let foundButNotUpdated = {}
    let notFoundNames = [];

    for (name of names) {
        const query = `
            query($search: String!) {
                search_user(search: $search, offset: 0, n: 1) {
                    users {
                        id
                        name
                        email
                    }
                }
            }
        `;

        const variables = {
            search: name
        };

        const res = await fetch("https://registration.2020.hack.gt/graphql", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + REGISTRATION_AUTH,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        const data = await res.json();

        if (data && data.data.search_user.users.length > 0) {
            const userId = data.data.search_user.users[0].id;

            const updateRes = await fetch("https://calls.hack.gt/user/points/add", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + CALLS_AUTH,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    event: CURRENT_EVENT
                })
            });

            const updateData = await updateRes.json();

            if (!updateData.error) {
                updatedNames.push(name);
            } else {
                foundButNotUpdated[name] = userId;
            }
        } else {
            notFoundNames.push(name);
        }
    }

    console.log("Updated names: ", updatedNames);
    console.log("Found but not updated: ", foundButNotUpdated);
    console.log("Not found names: ", notFoundNames);
}

checkNames();