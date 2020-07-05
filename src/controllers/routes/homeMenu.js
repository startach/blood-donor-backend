const homeMenuDB = require("../../database/home_menu_items")


exports.get = (req, res, next) => {
    homeMenuDB.getHomeMenuItems().then(data => {
        res.render("homeMenu", {data, selectedNavbarItem: 'homeMenu'})
    }).catch(next)

}

exports.post = ({params: {id}, body}, res) => {
    homeMenuDB.editHomeMenuItem(id, {
        title: {
            he: body.title_he,
            en: body.title_en,
            ar: body.title_ar,

        },
        src:body.src,
        redirectionLink:body.redirectionLink

    }).finally(() => res.redirect("/homeMenu"))

}

exports.delete = ({params:{id}}, res) => {
    homeMenuDB.deleteHomeMenuItem(id).finally(() => res.end())
}

exports.add = ({body}, res) => {

    homeMenuDB.addHomeMenuItem({
        title: {
            he: body.title_he,
            en: body.title_en,
            ar: body.title_ar,
        },
        context: {
            he: body.context_he,
            en: body.context_en,
            ar: body.context_ar,
        },
        src:body.src,
        redirectionLink:body.redirectionLink
    }).finally(() => res.redirect("/homeMenu"))
}
