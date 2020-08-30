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
            data = data.toString('utf8')
            if (err) reject(err)
            else resolve(JSON.parse(data))
        })
    })
}
function writeJsonToFileSync(path, data) {
    fs.writeFileSync(path, JSON.stringify(data))
}
function readJsonFileSync(path) {
    let data = fs.readFileSync(path)
    data = data.toString('utf8')
    return JSON.parse(JSON.parse(data));
}
function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}
function deleteFileSync(path) {
    fs.unlinkSync(path)
}

module.exports = {
    writeJsonToFile,
    readJsonFile,
    writeJsonToFileSync,
    readJsonFileSync,
    deleteFile,
    deleteFileSync,
}