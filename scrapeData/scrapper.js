const fetch = require("cross-fetch")
const parser = require("node-html-parser")

const makeRequest = async (url) => {
    let res = await fetch(url)
    return res.text()
}

const getQsData = async (ID) => {

    profileUrl = `https://www.codechef.com/users/${ID}`

    let htmlData = await makeRequest(profileUrl)
    htmlData = parser.parse(htmlData)

    // console.log(htmlData);

    let aTags = htmlData.querySelectorAll("a")
    if (!aTags) {
        console.log("No A tags found\n");
        return false
    }
    let res = []
    for (let i = 0; i < aTags.length; ++i) {
        res.push(aTags[i].innerText)
        // console.log(aTags[i].innerText);
    }

    console.log("Data scrapped\n");
    return res
}


module.exports = { getQsData }
