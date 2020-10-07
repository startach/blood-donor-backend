const ModelsGoals = require("../../models/goals");
const apiResponse = require("../../models/apiResponse")

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
console.log(req.body);
    try {
        await ModelsGoals.edit(Number(req.body.current), Number(req.body.goal));

        apiResponse(res, { message: " added successfully" });
    } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
    }

}

exports.apiGet = async (req, res) => {
    try {
        const data = await ModelsGoals.get()
        apiResponse(res,{data})
    } catch (e) {
        console.error(e)
        apiResponse(res,{message:"server error",code:500})
    }
}




// exports.post = async (req, res) => {

//     try {
//         await ModelsGoals.edit(Number(req.body.current), Number(req.body.goal));

//         res.render('goals', {
//             data: {
//                 current: req.body.current,
//                 goal: req.body.goal
//             },
//             message: 'Saved',
//             selectedNavbarItem: 'goals'
//         })
//     } catch (e) {
//         console.error(e)
//         res.render('goals', {
//             data: {
//                 current: req.body.current,
//                 goal: req.body.goal
//             },
//             error: e.message,
//             selectedNavbarItem: 'goals'
//         })
//     }
// }