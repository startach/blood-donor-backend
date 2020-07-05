const { alertEdit, alertsGet, alertDelete, alertAdd } = require('../../modules/alerts');

const moment = require("moment")


exports.get = (req, res, next) => {
    alertsGet().then(data => {
        data = data.map(x => ({ ...x, expDate: moment(x.expDate.toDate()).format("YYYY-MM-DD") }));
        res.render("alerts", { data, selectedNavbarItem: 'alerts' })
    }).catch(next)

}

exports.post = ({ params: { id }, body }, res) => {
    alertEdit(id, {
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

exports.delete = ({ params: { id } }, res) => {
    alertDelete(id).finally(() => res.end())

}

exports.add = ({ body }, res) => {

    alertAdd({
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
        bloodType: Object.keys(body).filter(x => x.includes("bloodType")).map(x => body[x]) || [],
        expDate: moment(body.expDate, "YYYY-MM-DD").toDate(),
        addedDate: new Date()

    }).catch(e => console.log(e)).finally(() => res.redirect("/alerts"))
}

exports.getAlertsApi = (req, res) => {

    alertsGet().then((data) => {
        res.status(200).json({ data: data || [], message: 'successful request', ok: true ,code:200})
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Ops, could not retreive data', ok: false,code:500 })

        })

}