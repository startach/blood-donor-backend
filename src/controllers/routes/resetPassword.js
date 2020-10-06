const {firebase} = require("../../database")
const apiResponse = require("../../models/apiResponse")



exports.post = (req, res) => {
    const emailAddress = req.body.emailAddress;

    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
         apiResponse(res, {
            message: 'Please check your email to reset your password',
        }) // Email sent.
    }).catch((e) => {
         apiResponse(res, {
            message: e.message, code: 500
        }) // An error happened.
    });
}
