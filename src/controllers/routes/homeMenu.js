const {homeMenuItemsGet,homeMenuItemAdd,homeMenuItemDelete,homeMenuItemEdit} = require('../../modules/home_menu_items');


exports.get = (req, res, next) => {
    homeMenuItemsGet().then(data => {
        res.render("homeMenu", {data, selectedNavbarItem: 'homeMenu'})
    }).catch(next)

}

exports.post = ({params: {id}, body}, res) => {
    homeMenuItemEdit(id, {
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
    homeMenuItemDelete(id).finally(() => res.end())
}

exports.add = ({body}, res) => {

    homeMenuItemAdd({
        title: {
            he: body.title_he,
            en: body.title_en,
            ar: body.title_ar,
        },
        src:body.src,
        redirectionLink:body.redirectionLink
    }).finally(() => res.redirect("/homeMenu"))
}



exports.getApi = async (req, res) => {

    try {
        const goals = await homeMenuItemsGet()
        res.json({data: goals || [], ok: true,code:200})
    } catch (e) {
        res.status(500).json({message: e.message, ok: false, code:500})
    }

}