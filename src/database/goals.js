const {db} = require('./index')
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
const editGoal = (data) => {
    if (schema.validate(data).error)
        return new Error(schema.validate(data).error.message)
     db.collection('general').doc('yearly_goals').set(data);
}

const getGoal = () => new Promise(async (resolve, reject) => {
    const goalsRef = db.collection('general').doc('yearly_goals');
    const doc = await goalsRef.get();
    if (!doc.exists) {
        return new Error('No such document!')
    } else {
        try {
            const data = await doc.data();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    }
});


module.exports = { editGoal, getGoal };