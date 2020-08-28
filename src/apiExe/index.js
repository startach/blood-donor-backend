
const path = require("path");
const fs = require("fs")
const { exec} = require('pkg');
require("dotenv").config();


const backendUrl = process.env.THIS_SERVER_URL;

if(!backendUrl)
    throw new Error("THIS_SERVER_URL must be set as an environment variable")

const dataPath = path.join(__dirname,"data.json");
fs.writeFileSync(dataPath, JSON.stringify({backendUrl}) , {flag:"w"} )

exec([ path.join(__dirname,"exeScript.js") , '--target', 'host', '--output', path.join(__dirname,"..","..",process.argv[2]) ]).then(function() {
    console.log('Done!')
    fs.unlink(dataPath,err => err && console.log(err))
}).catch(function(error) {
    console.error(error)
})