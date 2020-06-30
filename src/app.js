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
app.use(express.static(path.join(__dirname, '..', 'public')));



app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		layoutsDir: path.join(__dirname, "views", "layouts"),
		partialsDir: path.join(__dirname, 'views', 'partials'),
		defaultLayout: "main"
	})
);


module.exports = app;
