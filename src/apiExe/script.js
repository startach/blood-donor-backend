

const fs = require("fs")
const path = require("path")


    const outputPath = path.join(__dirname, "test.json");
    const data = JSON.stringify({test: "123"})
    fs.writeFileSync(outputPath, data, {flag: 'w+'});
