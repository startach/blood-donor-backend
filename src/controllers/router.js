const locations = require("./routes/locations");
const home = require("./routes/home");
const goals = require("./routes/goals");
const login = require("./routes/login");
const logout = require("./routes/logout");
const resetPassword = require("./routes/resetPassword");
const changePassword = require("./routes/changePassword");
const alerts = require("./routes/alerts");
const homeMenu = require("./routes/homeMenu");
const notifications = require("./routes/notifications");

const {redirectIfLoggedIn, redirectIfLoggedOut} = require("../middleware/authValidator");
const router = require("express").Router()
const apiResponse = require("../models/apiResponse")


router.all(["/",
    '/changePassword',
    /^\/alerts.*/,
    /^\/homeMenu.*/,
    /^\/goals.*/,
    /^\/locations.*/,
], redirectIfLoggedOut("/login"))

router.all([
    "/login",
    '/resetPassword',
], redirectIfLoggedIn("/"))


//routes that require the user to be logged out -----------------------
router.route('/login')
    .get(login.get)
    .post(login.post)


router.route('/resetPassword')
    .get(resetPassword.get)
    .post(resetPassword.post)


//routes that require the user to be logged in ------------
router.get('/', home.get)

router.route("/changePassword")
    .get(changePassword.get)
    .post(changePassword.post)

router.route('/goals')
    .get(goals.get)
    .post(goals.post);


router.get("/logout", logout.get)

router.get('/alerts', alerts.get)
router.post("/alerts", alerts.add)
router.post("/alerts/delete/:id", alerts.delete)
router.post("/alerts/:id", alerts.post)

router.get('/homeMenu', homeMenu.get)
router.post("/homeMenu", homeMenu.add)
router.post("/homeMenu/delete/:id", homeMenu.delete)
router.post("/homeMenu/:id", homeMenu.post)

router.get("/locations", locations.get)


//routes that work all the time ------------------------------------
router.get('/api/locations', locations.getLocationsApi);
router.post('/api/locations', locations.setLocationsApi);
router.get('/iframe/locations', locations.getLocationsIframe);
router.get('/api/alerts', alerts.getAlertsApi)
router.get('/api/goals', goals.apiGet)
router.get('/api/homeMenu', homeMenu.getApi)

router.get("/notifications/public_key", notifications.getPublicKey )
router.post("/notifications/subscribe", notifications.subscribe )



router.use(( req, res, next) => {
    apiResponse(res,{code:404,message:"not found"})
})
router.use((err, req, res, next) => {
    apiResponse(res,{code:500,message:"server error"})
})
module.exports = router;

