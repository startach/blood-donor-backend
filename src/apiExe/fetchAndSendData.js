const {getLocationsFromMada} = require("../models/locations");
const axios = require("axios")
const {backendUrl} = require("./data.json")


module.exports = function fetchAndSendData() {

    console.log("fetching data from mada...")

    return getLocationsFromMada()
        .then(madaArr => {

            console.log("sending data to server...")
            if (!Array.isArray(madaArr))
                throw new Error("incorrect data response type")

            return axios.post(backendUrl, madaArr)

        })
        .then(() => console.log("done!\n\n"))
        .catch(handleError)

}


function handleError({message}) {
    console.error('something went wrong, contact the dev team');
    console.warn(message)
    console.log('\n\nPress any key to exit...');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
