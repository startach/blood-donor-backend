const locations = require("./locations");

const router = require("express").Router()


router.get('/', (req, res) => {
    res.render("home", {
        title: 'blood donation organaization',
        username: "cordinator",
    })
})

router.get('/goals', (req, res) => {
    res.render('goals', {
        goal: '10,000',
        current:'2033',
    })
})

router.get('/login', (req, res) => {
    res.render('login',{
        error:"incorrect password",
        onSubmit:(e)=>{
            // e.preventDefault()
            console.log("test")
        }
    })
})

router.get('/locations',locations.getAllLocations );



module.exports =  router;

