const schedule = require("node-schedule")
const fetchAndSendData = require("./fetchAndSendData")
const pauseConsole = require("./pauseConsole")
const successMessage = "next round is in 3 hours. please don't close this window...";


fetchAndSendData()
    .then(() => console.log(successMessage))
    .catch(pauseConsole)


const job = schedule.scheduleJob('* */3 * * *', function () {
    fetchAndSendData()
        .then(() => console.log(successMessage))
        .catch(()=>{
            schedule.cancelJob(job)
            pauseConsole()
        })
});
