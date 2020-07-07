const {settingsMenuItemAdd,settingsMenuItemDelete,settingsMenuItemEdit,settingsMenuItemsGet} = require('../../modules/settingsMenu');


exports.get = (req, res, next) => {
    settingsMenuItemsGet().then(data => {
        res.render("settingsMenu", {data, selectedNavbarItem: 'settingsMenu'})
    }).catch(next)

}

exports.post = ({params: {id}, body}, res) => {
    settingsMenuItemEdit(id, {
        title: {
            he: body.title_he,
            en: body.title_en,
            ar: body.title_ar,

        },
        src:body.src,
        redirectionLink:body.redirectionLink

    }).finally(() => res.redirect("/settingsMenu"))

}

exports.delete = ({params:{id}}, res) => {
    settingsMenuItemDelete(id).finally(() => res.end())
}

exports.add = ({body}, res) => {

    settingsMenuItemAdd({
        title: {
            he: body.title_he,
            en: body.title_en,
            ar: body.title_ar,
        },
        src:body.src,
        redirectionLink:body.redirectionLink
    }).finally(() => res.redirect("/settingsMenu"))
}



exports.getApi = async (req, res) => {

    try {
        const goals = await homeMenuItemsGet()
        res.json({data: goals || [], ok: true,code:200})
    } catch (e) {
        res.status(500).json({message: e.message, ok: false, code:500})
    }

}