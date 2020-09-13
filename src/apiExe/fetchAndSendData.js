const {getLocationsFromMada} = require("../models/locations");
const axios = require("axios")
const {backendUrl} = require("./data.json")


module.exports = function fetchAndSendData() {

    console.log("fetching data from mada...")

    return new Promise((resolve, reject) => {
        getLocationsFromMada()
            .then(madaArr => {
                console.log("sending data to server...")
                if (!Array.isArray(madaArr))
                    throw new Error("incorrect data response type")
                return axios.post(backendUrl, madaArr)

            })
            .then(() => {
                console.log("done!\n\n")
                resolve()
            })
            .catch((e = {})=>{
                console.error('something went wrong, contact the dev team');
                console.warn(e.message)
                console.log('\n\n');
                reject(e)
            })
    })

}
