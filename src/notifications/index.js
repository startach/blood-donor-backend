const webPush = require("web-push")
const { getAll } = require("../models/notificationSubscribers")
const Joi = require('@hapi/joi');


const publicKey = process.env.NOTIFICATIONS_PUBLIC_KEY;
const privateKey = process.env.NOTIFICATIONS_PRIVATE_KEY;

if (!publicKey || !privateKey)
    throw new Error("NOTIFICATIONS_PUBLIC_KEY and NOTIFICATIONS_PRIVATE_KEY must be set ")


webPush.setVapidDetails("mailto:moris.rafol@gmail.com", publicKey, privateKey);
exports.webPush = webPush;

//todo remove my email


//
// {
//     title:{
//         he:"",
//         en:"",
//         ar:""
//     },
//     subTitle:{
//         he:"",
//         en:"",
//         ar:""
//     }
// }
const schema = Joi.object({
    title: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    subTitle: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    type: Joi.string().valid('personalGoal', 'alert')
})

exports.pushNotification = function (data) {
    //todo use joi
    if (schema.validate(data).error)
        throw new Error(schema.validate(data).error.message)
        
    const payload = JSON.stringify(data)
    console.log(payload);
    getAll().then(subsArr => {
        subsArr.forEach(sub => webPush.sendNotification(sub, payload))
    }).catch(({message}) => console.error(message))

}

