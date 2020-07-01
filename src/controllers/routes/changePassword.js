const { firebase } = require("../../database")

exports.get = (req, res) => {
    res.render("changePassword", {
        selectedNavbarItem: 'changePassword'

    });
}

exports.post = (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
        return res.render("changePassword",
            {
                error: "passwords do not match",
                selectedNavbarItem: 'changePassword'
            }
        );

    firebase.auth().currentUser.updatePassword(password)
        .then(() => res.render("changePassword", {
            message: "updated successfully",
            selectedNavbarItem: 'changePassword'
        }))
        .catch(e => res.render("changePassword", {
            error: e.message,
            selectedNavbarItem: 'changePassword'
        }))
}