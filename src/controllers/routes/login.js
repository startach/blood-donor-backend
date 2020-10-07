const { firebase } = require("../../database");
const apiResponse = require("../../models/apiResponse")

// exports.get = (req, res) => {
//   if (firebase.auth().currentUser) return res.redirect("/");
//   res.render("login");
// };

exports.post = (req, res) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user =>{console.log(user)
        return     user.getIdToken()})
        .then(() => apiResponse(res,{message:"successfuly"}))
        .catch(({message}) => apiResponse(res,{message,code:500}))
} 
;
