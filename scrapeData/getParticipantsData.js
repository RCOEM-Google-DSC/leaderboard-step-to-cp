const scrapper = require("./scrapper.js")
const dbFunc = require("./../dbFunc.js")
const { qsList } = require("./qsListData")
const dbFileLoc = "db.json"

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const AddZero = (num) => {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

const getCurrentTime = () => {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("-"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    return strDateTime
}

const swap = (a, b) => {
    let temp = a;
    a = b;
    b = temp
}

const init = async () => {
    /**
     * 1. get profile links
     * 2. check if Questions are done or not
     * 3. Update participants file with number of Questions done data
     */
    console.log("\n=========================");
    console.log("---Fetching CodeChef Data---");
    console.log("=========================\n");

    let participants = JSON.parse(dbFunc.read("participants.json"))
    // dummy data to test
    let profile = [{
        "firstName": "Madhav",
        "lastName": "Jha",
        "name": "Madhav Jha",
        "profileID": "jhamadhav28",
        "profileLink": "https://www.codechef.com/users/jhamadhav28/"
    }]
    // gets replace by real data from file so keep comment below line while testing 
    profile = participants["profiles"]

    for (let i = 0; i < profile.length; i++) {

        await delay(200)
        console.log(`Fetching Person ${i + 1}: ${profile[i]["name"]}`)

        let qsData = await scrapper.getQsData(profile[i]["profileID"])

        profile[i]["questions"] = {}
        let count = 0
        for (let j = 0; j < qsList.length; ++j) {

            let flag = qsData.indexOf(qsList[j])
            flag = (flag == -1) ? false : true;

            if (flag) {
                count++
            }

            profile[i]["questions"][qsList[j]] = flag

        }
        profile[i]["questions"]["count"] = count
    }

    // console.log(profile);
    console.log("\nUpdating db.json\n");
    let db = {
        "participants": profile,
        "time": getCurrentTime()
    }
    // console.log(db);
    dbFunc.write(dbFileLoc, db)
    console.log("\n---Data collection done---\n");
}

// entry function
init()
