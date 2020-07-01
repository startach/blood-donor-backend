const { getGoal, editGoal } = require('../database/goals');
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

const goalEdit = (current, goal) => {
    if (!current || typeof current !== 'number')
        return new Error('current should be defined as number');

    if (current < 0) {
        return new Error('current should be bigger than zero');
    }

    if (!goal || typeof goal !== 'number')
        return new Error('current should be defined as number');

    if (goal < 0) {
        return new Error('current should be bigger than zero');
    }

    let data = { "current": current, "goal": goal }

    if (schema.validate(data).error)
        return new Error(schema.validate(data).error.message)

    return editGoal()
}

const goalGet = () => {
    return getGoal();
}



module.exports = {
    goalEdit,
    goalGet
}