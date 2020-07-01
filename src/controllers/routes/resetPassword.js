const {firebase} = require("../../database")

exports.get = (req, res) => res.render('resetpassword')

exports.post = (req, res) => {
    const emailAddress = req.body.emailAddress;

    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
        return res.render('resetpassword', {
            message: 'Please check your email to reset your password',
        }) // Email sent.
    }).catch((e) => {
        return res.render('resetpassword', {
            error: e,
        }) // An error happened.
    });
}