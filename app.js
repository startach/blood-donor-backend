const express = require('express');
const cors = require('cors')
const controllers = require('./controllers')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const exphbs = require("express-handlebars");
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(controllers)
app.use(helmet())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		layoutsDir: path.join(__dirname, "views", "layouts"),
		defaultLayout: "main"
	})
);

app.set('port', process.env.PORT || 4000)
module.exports = app;
