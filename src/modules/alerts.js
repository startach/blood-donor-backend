const alerts = require('../database/alerts');
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

const edit = async (id, alert) => {
    if (!id) {
        throw new Error("id should be defined");
    }
    if (schema.validate(alert).error)
        throw new Error (schema.validate(alert).error.message);

    return await alerts.edit(id, alert);
}


const get = alerts.get

const del = async (id) => {
    if (!id) {
        throw new Error("id should be defined");
    }

    return await alerts.del(id)

}

const add = async (alert) => {
    if (schema.validate(alert).error)
        throw new Error(schema.validate(alert).error);
    return await alerts.add(alert);
}



module.exports = {
    edit,
    get,
    del,
    add,
}