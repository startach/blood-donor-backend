const { firebase } = require("../../database");
const apiResponse = require("../../models/apiResponse")
var admin = require('firebase-admin');

exports.get = (req, res) => {
  if (firebase.auth().currentUser) return res.redirect("/");
  res.render("login");
};

exports.post = (req, res) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    firebase.auth().currentUser.getIdToken( true).then(function(idToken) {return     user.getIdToken()
    });
    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      console.log(decodedToken);
      let uid = decodedToken.uid;
      // ...
      
    }).catch(function(error) {
      // Handle error
    });
    firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(user =>{console.log(user)
    })
    .then(() => apiResponse(res,{message:"successfuly"}))
    .catch(({message}) => apiResponse(res,{message,code:500}))
    ;
} 
