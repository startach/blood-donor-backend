const alertsDB = require("../../database/alerts")
const moment = require("moment")


exports.get = (req, res, next) => {
    alertsDB.getAlerts().then(data => {
       data = data.map(x=>({...x,expDate: moment(x.expDate.toDate()).format("YYYY-MM-DD") }));
        res.render("alerts", {data,selectedNavbarItem: 'alerts'})
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
        bloodType: Object.keys(body).filter(x => x.includes("bloodType")).map(x => body[x]),
        expDate: moment(body.expDate, "YYYY-MM-DD").toDate()

    }).finally(() => res.redirect("/alerts"))

}

exports.delete = ({req}, res) => {
    alertsDB.deleteAlert(req.params.id).finally(() => res.end())

}

exports.add = ({body},res)=>{

    alertsDB.editAlert({
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
        bloodType: Object.keys(body).filter(x => x.includes("bloodType")).map(x => body[x]),
        expDate: moment(body.expDate, "YYYY-MM-DD").toDate(),
        addedDate :Date.now()

    }).finally(() => res.redirect("/alerts"))
}
