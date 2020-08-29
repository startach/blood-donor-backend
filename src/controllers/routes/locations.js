const jsonFile = require("../../models/jsonFile")
const locationsModule = require("../../models/locations")
const deepEquals = require("deep-equal")


exports.get = (req, res) => {

    res.render("locations", {
        selectedNavbarItem: 'locations'
    })
}
exports.getLocationsApi = async (req, res) => {

    try {
        const data = await jsonFile.readJsonFile('src/database/locations.json') || []
        res.status(200).json({data, ok: true, code: 200});
    } catch (e) {
        res.status(200).json(
            {
                "code": 500,
                "ok": false,
                "message": "server side error"
            }
        );
    }
}
exports.setLocationsApi = async (req, res) => {

    try {
        let data = req.body
        const localData = await jsonFile.readJsonFile('src/database/locations.json') || []

        data.map(location =>
            localData.find(localLocation =>
                deepEquals({...localLocation, lat: undefined, lan: undefined}, location)) || location)

        //todo make sure that getAllGeolocations searches for the correct address

        data = await locationsModule.getAllGeolocations(data)
        await jsonFile.writeJsonToFile('src/database/locations.json', data)
        res.end()

    } catch (e) {
        res.status(200).json(
            {
                "code": 500,
                "ok": false,
                "message": "server side error"
            }
        );
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
