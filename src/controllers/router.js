
const router = require("express").Router()



router.get("/home", (req,res)=>{

    res.render("login");
})



module.exports =  router;

