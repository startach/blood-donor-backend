const schedule = require("node-schedule")
const fetchAndSendData = require("./fetchAndSendData")
const successMessage = "next round is in an hour. please don't close this window...";

//run the first time
fetchAndSendData()
    .then(() => console.log(successMessage))

//run every 3 hours
schedule.scheduleJob('* */1 * * *', function () {
    fetchAndSendData()
        .then(() => console.log(successMessage))
});
