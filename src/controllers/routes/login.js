const { firebase } = require("../../database");

exports.get = (req, res) => {
  if (firebase.auth().currentUser) return res.redirect("/");
  res.render("login");
};

exports.post = (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => res.redirect("/"))
    .catch((e) => res.render("login", { error: e.message }));
};
