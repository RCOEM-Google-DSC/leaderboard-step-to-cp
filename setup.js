const db = require("./dbFunc.js")

const init = () => {
    db.writeString("./refineData/rawParticipantsData.json", "")
    console.log("rawParticipantsData.json created");
}

init()