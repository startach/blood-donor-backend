const { goalEdit, goalGet } = require("../../modules/goals");

exports.get = (req, res) => {

    goalGet().then((data) => {
        res.render('goals', {
            data,
            selectedNavbarItem: 'goals'
        })
    }).catch(() => {
        res.render('goals', {
            data,
            selectedNavbarItem: 'goals'
        })
    })
}

exports.post = async (req, res) => {

    try {
        await goalEdit(Number(req.body.current), Number(req.body.goal));

        res.render('goals', {
            data: {
                current: req.body.current,
                goal: req.body.goal
            },
            message:  'Saved',
            selectedNavbarItem: 'goals'
        })
    } catch(e) {
        console.error(e)
        res.render('goals', {
            data: {
                current: req.body.current,
                goal: req.body.goal
            },
            error:  e.message,
            selectedNavbarItem: 'goals'
        })    
    }
}

exports.apiGet = (req, res) => {
   try{
    goalGet().then((data) => 
        res.status(200).json({ data: data || [], message: 'successful request', ok: true , code:200 })
    )
   } catch(e) {
        console.error(e)
        res.status(500).json({message: 'Ops, could not retrieve data',ok: false , code:500})
   }
}