exports.get =(req, res) => {
    res.render("home", {
        title: 'blood donation organaization',
        username: "cordinator",
    })
}