const locations = require("./locations");
const home = require("./routes/home");
const goals = require("./routes/goals");
const login = require("./routes/login");
const logout = require("./routes/logout");
const resetPassword = require("./routes/resetPassword");
const changePassword = require("./routes/changePassword");
const { redirectIfLoggedIn, redirectIfLoggedOut } = require("../middleware/authValidator");
const router = require("express").Router()


let array1 = [
    {
        title: {
            he: "...",
            en: "Blood donation needed, Haifa, A+",
            ar: "..."
        },
        context: {
            he: "...",
            en: "Haifa District",
            ar: "..."
        },
        bloodType: "A+",
        addedDate: new Date(),
        expDate: new Date(),
        hidden: true
    },
    {
        title: {
            he: "...",
            en: "Blood donation Needed, Tel Aviv, O-",
            ar: "..."
        },
        context: {
            he: "...",
            en: "Tel Aviv",
            ar: "..."
        },
        bloodType: "O-",
        addedDate: new Date(),
        expDate: new Date(),
        hidden: true
    }
]

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


router.get('/desktop', redirectIfLoggedOut("/login"), (req, res) => {
    res.render("desktop", { data: array1 })
})


router.get('/api/locations', locations.getAllLocations);
router.get('/iframe/locations', locations.getLocationsIframe);


module.exports = router;

