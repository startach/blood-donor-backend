const express = require('express');
const cors = require('cors')
const controllers = require('./controllers')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(controllers)

app.set('port', process.env.PORT || 4000)
module.exports = app;
