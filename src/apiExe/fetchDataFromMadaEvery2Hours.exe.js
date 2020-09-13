const schedule = require("node-schedule")
const fetchAndSendData = require("./fetchAndSendData")
const pauseConsole = require("./pauseConsole")
const successMessage = "next round is in 2 hours. please don't close this window...";


fetchAndSendData()
    .then(() => console.log(successMessage))
    .catch(pauseConsole)


const job = schedule.scheduleJob('* */2 * * *', function () {
    fetchAndSendData()
        .then(() => console.log(successMessage))
        .catch(()=>{
            schedule.cancelJob(job)
            pauseConsole()
        })
});
