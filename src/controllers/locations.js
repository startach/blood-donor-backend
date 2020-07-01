const fs = require('fs');

// let rawdata = fs.readFileSync('../database/locations.json');
// let student = JSON.parse(rawdata);

exports.getAllLocations = (req, res) => {
    let rawdata = fs.readFileSync('/home/farid/WebAhead/WebAheadProjects/blood-donr-back-end/src/database/locations.json');
    let locations = JSON.parse(rawdata);
    console.log(locations);
    res.status(200).json(locations);

    // getAllCustomers().then((result) => {
    //     res.status(200).json({ "result": result, "code": 200 });
    // })
}

const body = { "RequestHeader": { "Application": 101, "Module": "BloodBank", "Function": "GetAllDetailsDonations", "Token": "" }, "RequestData": "" }

let headers = {
    Accept: 'application/json, text/plain, */*',
};

if (body) {
    headers['Content-Type'] = 'application/json';
    headers['cookie'] = 'GCLB=CJSY9sTAh7WIhQE; rbzsessionid=2a9b60db124b2002c01afb275fb854c0; _ga=GA1.2.1892371988.1592293688; _gid=GA1.2.631777186.1592293688; _fbp=fb.1.1592293688005.696364955; __atssc=google%3B2; __atuvc=24%7C25; rbzid=x00OhQ0+4dhqF9wBpPwdsqICDEgkq7dE6i487ks+4WmlF5aJZXzc3Snnvwcy0kmQFJ71KYRGitbamZbqJWNEfjb9/wAuR3P2xZJ+PwmEsLkwWNyvX+GcNWRpvqWYXJ8feAg1wk3iB4251ElBM7F45TJngNjDoP28KE+Xw592PUOMmvOcpPwtATxWSl4QRfMfrW2Ximlfomldx1mO4PoNz00mGbvZXVT+7PPjEdz/2/tyDSM1HQMbdS3zuwAlJEm2YpjHuMEnP62kGbpe9eE6j7BFCJZO4qVQDI5XRcI4lQVxrFtZCNP/6NlQ+V2W62URILKDFyE27HlDyhnSMdkFKw==';
}

getAllCustomers = () => {
    let promise = new Promise(
        (resolve, reject) => {
            var http = require("https");

            var options = {
                "method": "POST",
                "hostname": "www.mdais.org",
                "port": null,
                "scheme": "https",
                "path": "/umbraco/api/invoker/execute",
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "f6b4a7b0-2873-f2fe-18d7-241704b44b78",
                    "cookie": "GCLB=CJSY9sTAh7WIhQE; rbzsessionid=2a9b60db124b2002c01afb275fb854c0; _ga=GA1.2.1892371988.1592293688; _fbp=fb.1.1592293688005.696364955; __atssc=google%3B2; _gid=GA1.2.474835944.1592819432; rbzid=0TBhmOE820ArGr4ItiazDPOBPc9evHbIcro2K2EZ02Xx4X4v2FbHKXLuPQdi4q89XnGC/2mW3EWjYW16mSyXB+wilbnuqkDhkd/yiJGC5ZibiUR0FPnYFhI3u/wM95ggPbtpTU4KO6Fi9aVM2hVwB0+ZNokYKG3ibAlKljwK49N45kkXtCvaaGQcbBV8H1+S9fzlKt2m8Kyo5tSf9SWCoziWSbHYXFajWsygptQQ8HbdDjgm35VZ4db1SVrtfLdQ47OQqvZx0qiqKCvO8dXXEA==; __atuvc=25%7C25%2C6%7C26; __atuvs=5ef0a8db5474d3c4001",
                    "origin": "https://www.mdais.org",
                    "authority": "www.mdais.org",
                    "accept-encoding": "json",
                    "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7,ar-IL;q=0.6,ar;q=0.5",
                    "content-length": "122",
                    "referer": "https://www.mdais.org/blood-donation",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
                }
            };


            var req = http.request(options, function (res) {
                var chunks = "";

                res.on("data", function (chunk) {
                    chunks += chunk.toString();
                });

                res.on("end", function () {
                    var obj = JSON.parse(chunks);
                    
                    resolve(obj.Result);
                });
            });

            req.write(JSON.stringify({
                RequestHeader:
                {
                    Application: 101,
                    Module: 'BloodBank',
                    Function: 'GetAllDetailsDonations',
                    Token: ''
                },
                RequestData: ''
            }));
            req.end();
        }
    );
    return promise;
}