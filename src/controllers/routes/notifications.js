const notificationSubscribers = require("../../models/notificationSubscribers");
const apiResponse = require("../../models/apiResponse")
const publicKey = process.env.NORIFICATIONS_PUBLIC_KEY;


exports.subscribe = async (req, res) => {

    const subscription = req.body;
    await notificationSubscribers.add(subscription)
    apiResponse(res, {message: "registered successfully"})

    //todo- schedule push notifications
}

exports.getPublicKey = (req, res) => {

    apiResponse(res, {data: {key: publicKey}})
}
