const fs = require('fs');
const querystring = require('querystring');
const axios = require("axios");

function writeMeAFile(jsonString, fileLocation) {
    try {
        fs.writeFile(fileLocation, jsonString, err => {
            if (err) {
                console.error('Error writing file', err)
            } else {
                console.log('Successfully wrote file to', fileLocation)
            }
        })
    } catch (e) {
    }
}

let getObjectFromFile = function (fileLocation) {
    let rawdata = "";
    try {
        rawdata = fs.readFileSync(fileLocation);
        let jsonData = JSON.parse(rawdata);
        return jsonData
    } catch (e) {
        console.error("there's been an error:", e)
    }
}

async function getGeolocation(donationLocationsObject) {
    let urlStart = "https://maps.googleapis.com/maps/api/geocode/json?"

    let params = {
        address: `${donationLocationsObject.numHouse} ${donationLocationsObject.Name.trim()}, ${donationLocationsObject.City.trim()}`,
        region: "il",
        language: "he",
        key: process.env.GOOGLE_GEOCODER_API,
    }
    let queryString = querystring.stringify(params);
    let concat = `${urlStart}${queryString}`;
    

    return await axios.get(concat)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.error("first api call failed, try with just city", err);
        })
}

async function returnLocationObject(objectFromFile) {
    // Iterate through the data prop to add lon and lat to each location. 

    for (let locationInfoObj of objectFromFile.data) {

        if (locationInfoObj.lon > 0) continue

        try {
            // get info from google API
            let geolocationResponse = await getGeolocation(locationInfoObj)
            let coords = geolocationResponse.results[0].geometry.location
            locationInfoObj.lon = coords.lng;
            locationInfoObj.lat = coords.lat;

        } catch (error) {
            console.error("the api didn't return coords", error.message);
            locationInfoObj.lon = 0;
            locationInfoObj.lat = 0;
        }

    }
// Change the data prop in objectFromFile before sending it to be written to file.
objectFromFile.lastUpdateToGelocation = new Date()

// write the changed object to file
let returnObjectStringified = JSON.stringify(objectFromFile);
writeMeAFile(returnObjectStringified, 'src/database/locations.json')

}

exports.updateGeolocations = async function (thisOften) {
    let objectFromFile = await getObjectFromFile('src/database/locations.json');

    // Check if geolocations have been updated today.
    if (objectFromFile.lastUpdateToGelocation && new Date(objectFromFile.lastUpdateToGelocation).getDate() === new Date().getDate()) {
        return
    }
    else returnLocationObject(objectFromFile)
}
