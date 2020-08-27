const {URL} = require("url")
const axios = require("axios");



async function getLocationsFromMada() {
    let response = await axios.get('https://www.mdais.org/7060ac19f50208cbb6b45328ef94140a612ee92387e015594234077b4d1e64f1/zGplDT8SMBbXs1VvdWNmrcNDNqCn22Oj')
    const firstCookie = (response.headers['set-cookie'][0]).split(" ")[0]
    response = await axios.post('https://www.mdais.org/umbraco/api/invoker/execute', {
        "RequestHeader": {
            "Application": 101,
            "Module": "BloodBank",
            "Function": "GetAllDetailsDonations",
            "Token": ""
        }, "RequestData": ""
    }, {
        headers: {

            "cookie": `${firstCookie} rbzid=0TBhmOE820ArGr4ItiazDPOBPc9evHbIcro2K2EZ02Xx4X4v2FbHKXLuPQdi4q89XnGC/2mW3EWjYW16mSyXB+wilbnuqkDhkd/yiJGC5ZibiUR0FPnYFhI3u/wM95ggPbtpTU4KO6Fi9aVM2hVwB0+ZNokYKG3ibAlKljwK49N45kkXtCvaaGQcbBV8H1+S9fzlKt2m8Kyo5tSf9SWCoziWSbHYXFajWsygptQQ8HbdDjgm35VZ4db1SVrtfLdQ47OQqvZx0qiqKCvO8dXXEA==`,
            "content-length": "122",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36",
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
        },
    })
    return JSON.parse(response.data.Result)
}
async function getAllGeolocations(madaArr) {

    const promises = madaArr.map(async (locationData)=>{
        try {
            const geolocationResponse = await getGeolocationCoordinates(locationData)
            let coords = geolocationResponse.results[0].geometry.location
            locationData.lon = coords.lng;
            locationData.lat = coords.lat;
        } catch (e){console.error(e)}

        return locationData;
    })

    return await Promise.all(promises)
}
async function getGeolocationCoordinates(donationLocationsObject) {
    const googleUrl = new URL("https://maps.googleapis.com/maps/api/geocode/json")
    const searchParams = googleUrl.searchParams;
    searchParams.append("region", "il")
    searchParams.append("language", "he")
    searchParams.append("key", process.env.GOOGLE_GEOCODER_API)
    searchParams.append("address", `${donationLocationsObject.Name.trim()} ${donationLocationsObject.numHouse} , ${donationLocationsObject.City.trim()}`)

    const {data} = await axios.get(googleUrl.href)
    return data;
}

module.exports = {
    getLocationsFromMada,
    getAllGeolocations,

}