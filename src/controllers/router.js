
const router = require("express").Router()

let array1 = [
{
    title:{
       he:"...",
       en:"Blood donation needed, Haifa, A+",
       ar:"..."
     }, 
    context:{
       he:"...",
       en:"Haifa District",
       ar:"..."
     }, 
    bloodType: "A+",
    addedDate:new Date(),
    expDate:new Date(),
    hidden: true
},
{
    title:{
       he:"...",
       en:"Blood donation Needed, Tel Aviv, O-",
       ar:"..."
     }, 
    context:{
       he:"...",
       en:"Tel Aviv",
       ar:"..."
     }, 
    bloodType: "O-",
    addedDate:new Date(),
    expDate:new Date(),
    hidden: true
}
]

router.get("/home", (req, res) => {

    res.render("login");
})

router.get('/desktop', (req,res) =>
    res.render("desktop", {data:array1})
)


module.exports = router;

