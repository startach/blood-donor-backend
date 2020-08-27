//
// const { exec } = require('pkg')
// exec([ process.argv[2], '--target', 'host', '--output', 'app.exe' ]).then(function() {
//
// }).catch(function(error) {
//     console.error(error)
// })



const fs = require("fs")
const path = require("path")


const outputPath = path.join(path.dirname(process.execPath), "test.json");
const data = JSON.stringify({test: "123"})
fs.writeFileSync(outputPath, data, {flag: 'w+'});
