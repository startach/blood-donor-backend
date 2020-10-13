const ModelsHomeMenuItems = require('../../models/home_menu_items');
const apiResponse = require("../../models/apiResponse")


exports.get = async (req, res, next) => {

    try {
        const data = await ModelsHomeMenuItems.get()
        res.render("homeMenu", { data, selectedNavbarItem: 'homeMenu' })
    } catch {
        next()
    }
}

exports.post = async ({ params: { id }, body }, res) => {

    try {
        await ModelsHomeMenuItems.edit(id, {
            title: {
                he: body.title_he,
                en: body.title_en,
                ar: body.title_ar,

            },
            src: body.src,
            redirectionLink: body.redirectionLink

        })
        res.redirect("/homeMenu")
    } catch ({ message }) {
        console.error(message)
    }

}

exports.delete = async ({ params: { id } }, res) => {
    try {
        await ModelsHomeMenuItems.del(id)
        res.end()
    } catch ({ message }) {
        console.error(message)
    }
}

exports.add = async ({ body }, res) => {

    try {
        await ModelsHomeMenuItems.add(
          body
        )
        apiResponse(res, { message: " edit successfully" });
    } catch ({ message }) {
      apiResponse(res, { message, code: 500 });
    }
}



exports.getApi = async (req, res) => {

    try {
        const data = await ModelsHomeMenuItems.get()
        apiResponse(res,{data})
    } catch (e) {
        apiResponse(res,{message:"server error",code:500})
    }

}