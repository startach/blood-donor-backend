const locations = require("./locations");
const home = require("./routes/home");
const goals = require("./routes/goals");
const login = require("./routes/login");
const logout = require("./routes/logout");
const resetPassword = require("./routes/resetPassword");
const changePassword = require("./routes/changePassword");
const alerts = require("./routes/alerts");
const homeMenu = require("./routes/homeMenu");
const { redirectIfLoggedIn, redirectIfLoggedOut } = require("../middleware/authValidator");
const router = require("express").Router()




router.get('/', redirectIfLoggedOut("/login"), home.get)


router.route('/goals')
    .all(redirectIfLoggedOut("/login"))
    .get(goals.get)
    .post(goals.post);



router.route('/login')
    .all(redirectIfLoggedIn("/login"))
    .get(login.get)
    .post(login.post)


router.route('/resetPassword')
    .get(resetPassword.get)
    .post(resetPassword.post)


router.get("/logout", logout.get)


router.route("/changePassword")
    .all(redirectIfLoggedOut("/login"))
    .get(changePassword.get)
    .post(changePassword.post)


router.get('/alerts', redirectIfLoggedOut("/login"), alerts.get)
router.post("/alerts",redirectIfLoggedOut("/login"),alerts.add)
router.post("/alerts/delete/:id",redirectIfLoggedOut("/login"),alerts.delete)
router.post("/alerts/:id",redirectIfLoggedOut("/login"),alerts.post)

router.get('/homeMenu', redirectIfLoggedOut("/login"), homeMenu.get)
router.post("/homeMenu",redirectIfLoggedOut("/login"),homeMenu.add)
router.post("/homeMenu/delete/:id",redirectIfLoggedOut("/login"),homeMenu.delete)
router.post("/homeMenu/:id",redirectIfLoggedOut("/login"),homeMenu.post)




//APIs
router.get('/api/locations', locations.getAllLocations);
router.get('/iframe/locations', locations.getLocationsIframe);
router.get('/api/alerts', alerts.getAlertsApi)
router.get('/api/goals', goals.apiGet)

module.exports = router;

