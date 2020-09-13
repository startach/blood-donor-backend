const schedule = require("node-schedule")
const fetchAndSendData = require("./fetchAndSendData")
const pauseConsole = require("./pauseConsole")
const successMessage = "next round is in half an hour. please don't close this window...";


fetchAndSendData()
    .then(() => console.log(successMessage))
    .catch(pauseConsole)


const job = schedule.scheduleJob('*/30 * * * *', function () {
    fetchAndSendData()
        .then(() => console.log(successMessage))
        .catch(()=>{
            schedule.cancelJob(job)
            pauseConsole()
        })
});
