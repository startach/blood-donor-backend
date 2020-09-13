const schedule = require("node-schedule")
const fetchAndSendData = require("./fetchAndSendData")
const successMessage = "next round is in 2 hours. please don't close this window...";

//run the first time
fetchAndSendData()
    .then(() => console.log(successMessage))

//run every 2 hours
schedule.scheduleJob('* */2 * * *', function () {
    fetchAndSendData()
        .then(() => console.log(successMessage))
});
