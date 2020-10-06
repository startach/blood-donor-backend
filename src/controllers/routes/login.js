const {firebase} = require("../../database")
const apiResponse = require("../../models/apiResponse")


exports.post = (req, res) => {
    // return (res.send("test"))
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user =>{console.log(user)
    return     user.getIdToken()})
     
    // .then(idToken => {firebase.auth().createSession

    // })
    
        .then(() => apiResponse(res,{message:"successfuly"}))
        .catch(({message}) => apiResponse(res,{message,code:500}))
} 
