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
    bloodType: Joi.array().items(Joi.string()),
    addedDate: Joi.date(),
    expDate: Joi.date(),
})

const alertEdit = async (id, alert) => {
    if (!id) {
        throw new Error("id should be defined");
    }
    if (schema.validate(alert).error)
        throw new Error (schema.validate(alert).error.message);

    return await editAlert(id, alert);
}


const alertsGet = getAlerts;

const alertDelete = async (id) => {
    if (!id) {
        throw new Error("id should be defined");
    }

    return await deleteAlert(id)

}

const alertAdd = async (alert) => {
    if (schema.validate(alert).error)
        throw new Error(schema.validate(alert).error);
    return await addAlert(alert);
}



module.exports = {
    alertEdit,
    alertsGet,
    alertDelete,
    alertAdd,
}