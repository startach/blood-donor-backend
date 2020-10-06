const webPush = require("../../notifications/index")
const apiResponse = require("../../models/apiResponse")
const publicKey = process.env.NORIFICATIONS_PUBLIC_KEY;

exports.subscribe = (req, res) => {

    const subscription = req.body;
    const payload = JSON.stringify({title: "welcome to the blood donor web app!"})

    webPush.sendNotification(subscription, payload)
        .then(() => console.log("notification sent!"))
        .catch(({message}) => console.warn("failed to send notification - ", message))

    apiResponse(res, {message: "registered successfully"})

    //todo- subscribe for push notifications

}

exports.getPublicKey = (req, res) => {

    apiResponse(res, {data: {key: publicKey}})
}