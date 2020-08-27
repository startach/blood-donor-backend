const fs = require("fs")

function writeJsonToFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), err => {
            if (err) reject(err)
            else resolve()
        })
    })

}
function readJsonFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(JSON.parse(data))
        })
    })
}

module.exports = {writeJsonToFile,readJsonFile}