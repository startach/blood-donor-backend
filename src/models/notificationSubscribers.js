const subscribers = require("../database/notificationSubscribers");
const Joi = require('@hapi/joi');

const schema = Joi.object({
    endpoint: Joi.string(),
    keys: Joi.object({
        auth: Joi.string(),
        p256dh: Joi.string()
    })
})

exports.add = async function (data) {
    if (schema.validate(data).error)
        throw new Error(schema.validate(data).error.message)
    return await subscribers.add(data)
}
exports.getAll = async function () {
    return await subscribers.getAll()
}

