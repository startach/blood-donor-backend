const moment = require("moment");
const webPush = require("web-push")
const {getById:getAlertById} = require("../models/alerts");
const {getAll,updateLastResponseDate,remove} = require("../models/notificationSubscribers")
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
    }).optional(),
    subTitle: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }).optional(),
    type: Joi.string().valid('personalGoal', 'alert'),
    bloodType: Joi.array().items(Joi.string()).optional()
})

exports.pushNotification = function (data) {


    if (schema.validate(data).error)
        throw new Error(schema.validate(data).error.message)

    const payload = JSON.stringify(data)

    getAll().then(subsArr => {
        subsArr.forEach(sub =>
            webPush.sendNotification(sub, payload)
                .then(()=> updateLastResponseDate(sub.id))
                .catch(()=>{
                    if( moment(sub.lastResponseDate).add("60","days").isBefore(moment()))
                        remove(sub.id)
                }))

    }).catch(({message}) => console.error(message))

}

exports.sendAlertNotification = function(id, delayMS) {
    setTimeout(() => {

        getAlertById(id).then(data => {
            const newAlert = {
                title: data.title,
                subTitle: data.context,
                type: 'alert',
                bloodType: data.bloodType || []
            }
            exports.pushNotification(newAlert)
        })
    }, delayMS)

}
