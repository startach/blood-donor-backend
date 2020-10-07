const notificationSubscribers = require("../../models/notificationSubscribers");
const webPush = require("../../notifications/index")
const apiResponse = require("../../models/apiResponse")
const publicKey = process.env.NORIFICATIONS_PUBLIC_KEY;

exports.subscribe = async (req, res) => {

    const subscription = req.body;
    const payload = JSON.stringify({title: "welcome to the blood donor web app!"})

    await notificationSubscribers.add(subscription)
    await webPush.sendNotification(subscription, payload)
    apiResponse(res, {message: "registered successfully"})

    //todo- subscribe for push notifications
    //todo- schedule push notifications
}

exports.getPublicKey = (req, res) => {

    apiResponse(res, {data: {key: publicKey}})
}