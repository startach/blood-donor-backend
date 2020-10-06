const webPush = require("web-push")

const publicKey =process.env.NOTIFICATIONS_PUBLIC_KEY;
const privateKey =process.env.NOTIFICATIONS_PRIVATE_KEY;

if(!publicKey || !privateKey)
    throw new Error("NOTIFICATIONS_PUBLIC_KEY and NOTIFICATIONS_PRIVATE_KEY must be set ")

webPush.setVapidDetails("mailto:moris.rafol@gmail.com",publicKey,privateKey);
//todo remove my email
module.exports = webPush;
