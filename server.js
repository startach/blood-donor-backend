require("dotenv").config()
const app = require('./src/app');

app.set('port', process.env.PORT || 4000)
let port = app.get('port')

app.listen(port, () => {
    console.log(`App running on port:${port}`)
})