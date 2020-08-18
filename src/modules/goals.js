const goals = require('../database/goals');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    current: Joi.number()
        .integer()
        .min(0)
        .max(1000000)
        .required(),
    goal: Joi.number()
        .integer()
        .min(0)
        .max(1000000)
        .required()

})

const edit = async (current, goal) => {
    if (!current || typeof current !== 'number')
        throw new Error('current should be defined as number');

    if (current < 0) {
        throw  new Error('current should be bigger than zero');
    }

    if (!goal || typeof goal !== 'number')
        throw  new Error('current should be defined as number');

    if (goal < 0) {
        throw  new Error('current should be bigger than zero');
    }

    let data = { current, goal }

    if (schema.validate(data).error)
        throw  new Error(schema.validate(data).error.message)

    return await goals.edit(data)
}

const get = goals.get;



module.exports = {
    edit,
    get
}