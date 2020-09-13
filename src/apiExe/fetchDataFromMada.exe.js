const fetchAndSendData = require("./fetchAndSendData")
const pauseConsole = require("./pauseConsole")


fetchAndSendData()
    .then(pauseConsole)
    .catch(pauseConsole)
