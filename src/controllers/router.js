const locations = require("./locations");
const {redirectIfLoggedIn} = require("../middleware/authValidator");
const {redirectIfLoggedOut} = require("../middleware/authValidator");
const router = require("express").Router()
const {firebase} = require("../database")
const {goalGet, goalEdit} = require('../modules/goals')

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

router.get('/', (req, res) => {
    res.render("home", {
        title: 'blood donation organaization',
        username: "cordinator",
    })
})

router.route('/goals')
    .all(redirectIfLoggedOut("/login"))
    .get((req, res) => {
        const goalData = goalGet().then((data) => {
            res.render('goals', {
                data
            })
        })
    })
    .post((req, res) => {

        const request = goalEdit(Number(req.body.current), Number(req.body.goal));
        res.render('goals', {
            data: {
                current: req.body.current,
                goal: req.body.goal
            },
            error: (request instanceof Error) ? request.message : null,
            message: (request instanceof Error) ? null : 'Saved',
        })

    })

router.route('/login')
    .all(redirectIfLoggedIn("/login"))
    .get((req, res) => {
        if (firebase.auth().currentUser)
            return res.redirect("/")
        res.render('login')
    })
    .post((req, res) => {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .then(() => res.redirect("/"))
            .catch((e) => res.render("login", {error: e.message}))
    })

router.route('/resetPassword') 
.get((req, res) => {
    return res.render('resetpassword')
})
.post((req, res) => {
    const emailAddress = req.body.emailAddress;

    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        return res.render('resetpassword', {
            message: 'please check your email to reset your password',
        }) // Email sent.
      }).catch((e) => {
        return res.render('resetpassword', {
            error: e,
        }) // An error happened.
      });
})

router.get("/logout", (req, res) => {
    firebase.auth().signOut().finally(() => res.redirect("/login"))
})


router.get("/home", (req, res) => {

    res.render("login");
})

router.get('/desktop', (req, res) => {
    res.render("desktop", {data: array1})
})

router.get('/api/locations', locations.getAllLocations);


module.exports = router;

