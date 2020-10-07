const {firebase} = require("../database")
var admin = require('firebase-admin');

exports.redirectIfLoggedIn = (route) => (req, res, next) => {
    if (firebase.auth().currentUser)
        return res.redirect(route)
    next();
}


exports.redirectIfLoggedOut = (route) => (req, res, next) => {
    if (!firebase.auth().currentUser)
        return res.redirect(route)
    next();
}

exports.loadUserData = (req, res,next) => {
    const user = firebase.auth().currentUser;

    res.locals.user = user;
    res.locals.signedIn = user;

    next()
}