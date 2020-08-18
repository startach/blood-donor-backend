const ModelsAlerts = require('../../models/alerts');

const moment = require("moment")


exports.get = async (req, res, next) => {
    try {
        let data = await ModelsAlerts.get()
        data = data.map(x => ({ ...x, expDate: moment(x.expDate.toDate()).format("YYYY-MM-DD") }));
        res.render("alerts", { data, selectedNavbarItem: 'alerts' })
    } catch(e) {
        next(e)
    }
}

exports.post = async ({ params: { id }, body }, res) => {
    await ModelsAlerts.edit(id, {
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
        addedDate: moment(Number(body.addedDate), "s").toDate()

    })
    res.redirect("/alerts");

}

exports.delete = async ({ params: { id } }, res) => {
    await ModelsAlerts.del(id)
    res.end()
}

exports.add = async ({ body }, res) => {
    try {
        await ModelsAlerts.add({
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
        })
        res.redirect("/alerts")
    } catch (e) {
        console.log(e)
    }
}

exports.getAlertsApi = async (req, res) => {
    try {
        const data = await ModelsAlerts.get()
        res.status(200).json({ data: data || [], message: 'successful request', ok: true, code: 200 })
    } catch(e) {
        console.log(err);
        res.status(500).json({ message: 'Ops, could not retrieve data', ok: false, code: 500 })
    }
}