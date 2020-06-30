const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const exphbs = require("express-handlebars");
const path = require('path');
const router = require("./controllers/router")
const {loadUserData} = require("./middleware/authValidator");
const showEditPanelHelper = require('./views/helpers/showEditPanel.js')
const dateHelper = require('./views/helpers/dateHelper.js')

const livereload = require("livereload");
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

var connectLivereload = require("connect-livereload");
const app = express();
app.use(connectLivereload());

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use(helmet())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(loadUserData)
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router)


app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		layoutsDir: path.join(__dirname, "views", "layouts"),
		partialsDir: path.join(__dirname, 'views', 'partials'),
		defaultLayout: "main",
		helpers: {
			showEditPanelHelper: showEditPanelHelper,
			dateHelper: dateHelper
		}
	})
);


module.exports = app;
