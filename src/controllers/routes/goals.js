const ModelsGoals = require("../../models/goals");

exports.get = async (req, res) => {

    let data;
    try {
        data = await ModelsGoals.get()
    } catch({message}) {
        console.error(message)
    }
    res.render('goals', {
        data,
        selectedNavbarItem: 'goals'
    })


}

exports.post = async (req, res) => {

    try {
        await ModelsGoals.edit(Number(req.body.current), Number(req.body.goal));

        res.render('goals', {
            data: {
                current: req.body.current,
                goal: req.body.goal
            },
            message: 'Saved',
            selectedNavbarItem: 'goals'
        })
    } catch (e) {
        console.error(e)
        res.render('goals', {
            data: {
                current: req.body.current,
                goal: req.body.goal
            },
            error: e.message,
            selectedNavbarItem: 'goals'
        })
    }
}

exports.apiGet = async (req, res) => {
    try {
        const data = await ModelsGoals.get() 
        res.status(200).json({ data: data || [], message: 'successful request', ok: true, code: 200 })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Ops, could not retrieve data', ok: false, code: 500 })
    }
}