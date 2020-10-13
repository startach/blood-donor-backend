const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const exphbs = require("express-handlebars");
const path = require('path');
const router = require("./controllers/router")
const { loadUserData } = require("./middleware/authValidator");
const helpers = require('./views/helpers/helpers')
const { redirectIfLoggedOut } = require("./middleware/authValidator");
const schedule = require("node-schedule")
const {pushNotification} = require('./notifications')


const app = express();

const allowedCorsRoutes = (process.env.CORS_ORIGIN ||"").split(",");
app.use(cors({credentials: true, origin: allowedCorsRoutes}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(helmet())



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(loadUserData)
app.use("/exeFiles",redirectIfLoggedOut("/"));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router)


app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		layoutsDir: path.join(__dirname, "views", "layouts"),
		partialsDir: path.join(__dirname, 'views', 'partials'),
		defaultLayout: "main",
		helpers,
	})
);

 schedule.scheduleJob('0 0 12 * * *', () => {
	try {
		const data = {
			type: 'personalGoal'
		}
		 pushNotification(data)
	} catch({message}) {
		console.error(message)
	}
 })





module.exports = app;
