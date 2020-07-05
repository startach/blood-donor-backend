const { goalEdit, goalGet } = require("../../modules/goals");
const { response } = require("express");

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

exports.apiGet = (req, res) => {
   try{
    goalGet().then((data) => 
        res.status(200).json({ data: data || [], message: 'successful request', ok: true })
    )
   } catch(e) {
        console.error(e)
        res.status(500).json({message: 'Ops, could not retreive data',ok: false})
   }
}