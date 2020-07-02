const alertsDB = require("../../database/alerts")
exports.get = (req, res, next) => {
    alertsDB.getAlerts().then(data => {
           res.render("alerts", {data})
    }).catch(next)

}

exports.post = ({params: {id}, body}, res) => {

    alertsDB.editAlert(id, {
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
        bloodType: Object.keys(body).filter(x => x.includes("bloodType")).map(x => body[x])

    }).finally(() => res.redirect("/alerts"))

}

exports.delete = (req, res) => {
    alertsDB.deleteAlert(req.params.id).finally(() => res.end())

}