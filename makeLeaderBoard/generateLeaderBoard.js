const fs = require('fs')
const dbFunc = require("../dbFunc.js")
const dbFileLoc = "./leaderBoardSite/leaderBoard.js"

const max = (a, b) => {
    return (a >= b) ? a : b;
}
const min = (a, b) => {
    return (a <= b) ? a : b;
}

const init = () => {

    let participants = JSON.parse(dbFunc.read("db.json"))
    leaderBoard = participants["participants"]

    // sample data
    /**
     {
        firstName: 'Madhav',
        lastName: 'Jha',
        name: 'Madhav Jha',
        profileID: 'jhamadhav28',
        profileLink: 'https://www.codechef.com/users/jhamadhav28/',
        questions: { EMAILREM: true, BUDGET_: true, count: 2 }
    }
     */

    leaderBoard.sort((a, b) => {
        if (a["questions"]["count"] == b["questions"]["count"]) {
            return ((a["name"] < b["name"]) ? -1 : 1)
        }

        return ((a["questions"]["count"] > b["questions"]["count"]) ? -1 : 1)
    })

    let leaderBoardData = "const leaderBoardData = ["
    for (let i = 0; i < leaderBoard.length; i++) {
        leaderBoardData += JSON.stringify(leaderBoard[i]);
        leaderBoardData += ","
    }
    leaderBoardData += "]"
    leaderBoardData += `\nconst updateTime =  "${participants["time"]}"`

    fs.writeFile(dbFileLoc, leaderBoardData, (err) => {
        if (err) {
            throw err;
        }
    });

}

init()