const fs = require('fs');
const { updateGeolocations } = require('./updateGeolocations');
const axios = require('axios');



exports.getAllLocations = (req, res) => {

    let rawdata = "";
    try {
        rawdata = fs.readFileSync('src/database/locations.json');
        let locations = JSON.parse(rawdata);
        res.status(200).json(locations);
    } catch (e) {
        res.status(200).json(
            {
                "code": 500,
                "ok": false,
                "message": "error in reading file"
            }
        );
    }
}


exports.getLocationsIframe = (req, res) => {
    fetchLocations().then((result) => {
        res.status(200).render('locations', {
            // encodeURIComponent so later we can use the data in the script tag as a javascript value
            result: encodeURIComponent(JSON.stringify(result)),
            layout: 'locations-iframe'
        });
    })
}

const getCookies = async () => {
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

    return  JSON.parse(response.data.Result)

}

exports.getAllLocationsFromServer = async () => {


    try {
        const result = await getCookies()

        const jsonString = `{ "data" : ${JSON.stringify(result)} , "ok":${true}, "message":"", "code":${200} }`;
        await fs.writeFileSync('src/database/locations.json', jsonString);
        await updateGeolocations();


    } catch (e) {
        console.error(e)
    }

}




