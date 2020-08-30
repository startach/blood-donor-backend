const schedule = require("node-schedule")
const fetchAndSendData = require("./fetchAndSendData")

//run the first time
fetchAndSendData()
    .then(() => console.log("next round is in 3 hours."))

//run every 3 hours
schedule.scheduleJob('* */3 * * *', function () {
    fetchAndSendData()
        .then(() => console.log("next round is in 3 hours."))
});
