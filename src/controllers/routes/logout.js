const {firebase} = require("../../database")

exports.get =  (req, res) => {
    firebase.auth().signOut().finally(() => res.redirect("/login"))
}