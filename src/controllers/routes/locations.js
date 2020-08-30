const deepEquals = require("deep-equal")
const jsonFile = require("../../models/jsonFile")
const locationsModule = require("../../models/locations")
const apiResponse = require("../../models/apiResponse")


exports.get = (req, res) => {

    res.render("locations", {
        selectedNavbarItem: 'locations'
    })
}
exports.getLocationsApi = async (req, res) => {

    try {
        const data = await jsonFile.readJsonFile('src/database/locations.json') || []
        apiResponse(res,{data})
    } catch (e) {
        apiResponse(res,{message:"server error",code:500})
    }
}
exports.setLocationsApi = async (req, res) => {

    try {
        let data = req.body
        const localData = await jsonFile.readJsonFile('src/database/locations.json') || []

        //check if the location already exists locally
        data = data.map(location =>
            localData.find(localLocation => deepEquals(
                {...localLocation, lat: undefined, lon: undefined},
                {...location, lat: undefined, lon: undefined}))
            || location)

        //get the geolocation for the non-existing data
        data = await locationsModule.getAllGeolocations(data)

        //update local data
        await jsonFile.writeJsonToFile('src/database/locations.json', data)
        apiResponse(res,{message:"updated successfully!"})

    } catch ({message}) {
        apiResponse(res,{message,code:500})

    }

}
exports.getLocationsIframe = async (req, res) => {

    try {
        const data = await jsonFile.readJsonFile('src/database/locations.json') || []
        res.status(200).render('locationsIframe', {
            // encodeURIComponent so later we can use the data in the script tag as a javascript value
            result: encodeURIComponent(JSON.stringify(data)),
            layout: 'locations-iframe'
        });
    } catch (e) {
        res.end()
    }

}
