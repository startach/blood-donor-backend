const { editAlert, deleteAlert, addAlert, getAlerts } = require('../database/alerts');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),

    context: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    bloodType: Joi.string(),
    addedDate: Joi.date(),
    expDate: Joi.date(),
})

const alertEdit = (id, alert) => {
    if (!id) {
        return new Error("id should be defined");
    }
    if (schema.validate(alert).error)
        return (schema.validate(alert).error.message);

    return editAlert(id, alert);
}


const alertsGet = () => {
    return getAlerts();
}

const alertDelete = (id) => {
    if (!id) {
        return new Error("id should be defined");
    }

    return deleteAlert(id)

}

const alertAdd = (alert) => {
    if (schema.validate(alert).error)
        return (schema.validate(alert).error.message);
    return addAlert(alert);
}



module.exports = {
    alertEdit,
    alertsGet,
    alertDelete,
    alertAdd,
}