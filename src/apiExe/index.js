const path = require("path");
const fs = require("fs")
const {exec} = require('pkg');
const jsonFile = require("../models/jsonFile")
require("dotenv").config();


//load Environment variable
const backendUrl = process.env.MADA_POST_URL_ROUTE;
if (!backendUrl)
    throw new Error("THIS_SERVER_URL must be set as an environment variable")

//create exe function
async function createExe(jsPath, outputPath) {
    await exec([jsPath, '--targets', 'linux,win', '--output', outputPath]);
}

//create "data.json" file storing the Environment variable
const dataPath = path.join(__dirname, "data.json");
jsonFile.writeJsonToFileSync(dataPath,{backendUrl});
console.log('"data.json" created')

//load all exe files in the directory
const fileNamesInDir = fs.readdirSync(__dirname).filter(fileName => (/.exe.js$/i).test(fileName));
const filePaths = fileNamesInDir.map(fileName => path.join(__dirname, fileName));
const outputDir = process.argv[2];


async function createFiles () {
    for (let index = 0; index < filePaths.length;index++) {
        const fileNameWithoutExt = fileNamesInDir[index].split(".exe.js")[0]
        const outputPath = path.join(outputDir,fileNameWithoutExt )
        await createExe(filePaths[index], outputPath)
        console.log("generated executable:",fileNameWithoutExt )
    }
   await jsonFile.deleteFile(dataPath)
    console.log('"data.json" deleted')

}

createFiles().then(()=>console.log("done!"))


