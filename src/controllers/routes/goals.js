const {goalEdit,goalGet} = require("../../modules/goals");

exports.get = (req, res) => {

   goalGet().then((data) => {
        res.render('goals', {
            data,
            selectedNavbarItem: 'goals'
        })
    })

}

exports.post = (req, res) => {

    const request = goalEdit(Number(req.body.current), Number(req.body.goal));
    res.render('goals', {
        data: {
            current: req.body.current,
            goal: req.body.goal
        },
        error: (request instanceof Error) ? request.message : null,
        message: (request instanceof Error) ? null : 'Saved',
        selectedNavbarItem: 'goals'
    })
}