const { alertEdit, alertsGet, alertDelete, alertAdd } = require('../../modules/alerts');
const { database } = require('firebase');



exports.getAlertsApi = (req, res) => {

    alertsGet().then((data) => {
        res.status(200).json({ data, 'code': 200 })
    })
        .catch((err) => {
            console.log(err);
        })

}