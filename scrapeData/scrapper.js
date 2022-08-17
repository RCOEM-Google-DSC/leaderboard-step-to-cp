const fetch = require("cross-fetch")
const parser = require("node-html-parser")

const makeRequest = async (url) => {
    let res = await fetch(url)
    return res.text()
}

const getQsData = async (ID, qs) => {

    // console.log(`ID: ${ID}, qs: ${qs}`);

    url = `https://www.codechef.com/status/${qs}?sort_by=All&sorting_order=asc&language=All&status=FullAC&handle=${ID}&Submit=GO`

    let htmlData = await makeRequest(url)
    htmlData = parser.parse(htmlData)

    // console.log(htmlData);

    let submissionClass = htmlData.querySelectorAll(".dataTable")
    if (!submissionClass) {
        console.log("No submission found\n");
        return false
    }

    let firstAC = htmlData.querySelectorAll(".dataTable tbody tr")
    if (!firstAC) {
        console.log("No submission found\n");
        return false
    }

    let firstACelem = firstAC[firstAC.length - 1]
    let acTimeElem = firstACelem.querySelectorAll("td")[1]

    if (!acTimeElem) {
        console.log("No AC time div found\n");
        return false
    }

    let res = acTimeElem.innerText
    console.log(`AC found at ${res}\n`);

    return res
}

module.exports = { getQsData }
