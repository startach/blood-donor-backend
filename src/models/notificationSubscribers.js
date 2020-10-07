const subscribers = require("../database/notificationSubscribers");
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    src: Joi.string(),
    redirectionLink: Joi.string(),
})

exports.add = async function(data) {
    return await subscribers.add(data)
}
exports.getAll= async function() {
    return await subscribers.getAll()
}

