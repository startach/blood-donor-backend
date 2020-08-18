const homeMenuItems = require('../../modules/home_menu_items');


exports.get = async (req, res, next) => {

    try {
        const data = await homeMenuItems.get()
        res.render("homeMenu", { data, selectedNavbarItem: 'homeMenu' })
    } catch {
        next()
    }
}

exports.post = async ({ params: { id }, body }, res) => {

    try {
        await homeMenuItems.edit(id, {
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
        await homeMenuItems.del(id)
        res.end()
    } catch ({ message }) {
        console.error(message)
    }
}

exports.add = async ({ body }, res) => {

    try {
        await homeMenuItems.add({
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



exports.getApi = async (req, res) => {

    try {
        const goals = await homeMenuItems.get()
        res.json({ data: goals || [], ok: true, code: 200 })
    } catch (e) {
        res.status(500).json({ message: e.message, ok: false, code: 500 })
    }

}