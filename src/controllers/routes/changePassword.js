const {firebase} = require("../../database")

exports.get = (req, res) => {
    res.render("changePassword");
}

exports.post = (req, res) => {
    const {password, confirmPassword} = req.body;
    console.log(req.body)
    if (password !== confirmPassword)
        return res.render("changePassword", {error: "passwords do not match"});

    firebase.auth().currentUser.updatePassword(password)
        .then(() => res.render("changePassword", {message: "updated successfully"}))
        .catch(e => res.render("changePassword", {error: e.message}))
}