const locations = require("./locations");
const {redirectIfLoggedIn} = require("../middleware/authValidator");
const {redirectIfLoggedOut} = require("../middleware/authValidator");
const router = require("express").Router()
const {firebase} = require("../database")

router.get('/', (req, res) => {
    res.render("home", {
        title: 'blood donation organaization',
        username: "cordinator",
    })
})

router.get('/goals', redirectIfLoggedOut("/login"), (req, res) => {
    res.render('goals', {
        goal: '10,000',
        current: '2033',
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

router.get("/logout",(req,res)=>{
    firebase.auth().signOut().finally(()=> res.redirect("/login"))
})


router.get('/api/locations', locations.getAllLocations);


module.exports = router;

