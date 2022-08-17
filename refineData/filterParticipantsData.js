const db = require("./../dbFunc.js")
let data = db.read("./refineData/rawParticipantsData.json")
data = JSON.parse(data)

// console.log(data);

const getProfileID = (url) => {
    ls = url.split('/')

    // in case we have / at the end of the url
    if (url[url.length - 1] == '/') {
        res = ls[ls.length - 2]
    } else {
        res = ls[ls.length - 1]
    }
    // console.log(res);
    return res
}


data = data.map((elem) => {
    return {
        "firstName": elem["First Name"],
        "lastName": elem["Last Name"],
        "name": elem["First Name"] + " " + elem["Last Name"],
        "profileID": getProfileID(elem["CodeChef Profile Link"]),
        "profileLink": elem["CodeChef Profile Link"],
    }
})

// console.log(data[0]);

let participants = {
    "profiles": data
}
db.write("participants.json", participants)