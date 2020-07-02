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


const app = express();

app.use(cors({credentials: true, origin: ['http://localhost:3000']}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
