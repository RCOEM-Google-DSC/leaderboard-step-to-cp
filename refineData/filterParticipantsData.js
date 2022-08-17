const db = require("./../dbFunc.js")
let data = db.read("./refineData/rawParticipantsData.json")
data = JSON.parse(data)

console.log(data);

const monToNum = (inp) => {
    return new Date(Date.parse(inp + " 1, 2012")).getMonth()
}

data = data.map((elem) => {
    return {
        "firstName": elem["First Name"],
        "lastName": elem["Last Name"],
        "name": elem["First Name"] + " " + elem["Last Name"],
        "profileLink": elem["CodeChef Profile Link"],
    }
})

console.log(data[0]);

let participants = {
    "profiles": data
}
db.write("participants.json", participants)