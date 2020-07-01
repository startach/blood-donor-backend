const db = require('./index')
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

const addAlert = (data) => new Promise(async (resolve, reject) =>{
    if (schema.validate(data).error)
       return (schema.validate(data).error.message);
       db.collection('alerts').doc().set(data).then(()=>{
       resolve(data);
    }).catch((e) => {
        reject(e);
    })
})


const editAlert = (id,data) => new Promise(async (resolve, reject) =>{
    if (schema.validate(data).error)
       return (schema.validate(data).error.message);
    db.collection('alerts').doc(id).set(data).then(()=>{
        resolve("object updated");
    }).catch((e) => {
        reject(e);
    })
})


const deleteAlert = (id) => new Promise(async (resolve, reject) =>{
    db.collection('alerts').doc(id).delete().then(()=>{
        resolve("object deleted");
    }).catch((e) => {
        reject(e);
    })
})

const getAlerts = () => new Promise(async (resolve, reject) => {
    const alertsRef = db.collection('alerts');
    try {
        const doc = await alertsRef.get();
        var result = []
        doc.forEach(doc => {
            result.push({[doc.id] : doc.data()})
        });
        resolve(result);
    } catch (e) {
        reject(e);
    }

});

module.exports = {
    addAlert,
    editAlert,
    deleteAlert,
    getAlerts
};