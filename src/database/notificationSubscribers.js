const {db} = require('./index')
const deepEquals = require("deep-equal")

exports.add = async function (subscriptionObject) {
    let data = await exports.getAll();

    const basicSub = getBasicSubObj(subscriptionObject)
    data = data.map(x => getBasicSubObj(x)).filter(x => deepEquals(basicSub, x))


    if (data.length)
        return subscriptionObject;

    await db.collection("subscriptions").doc().set({...subscriptionObject, lastResponseDate: new Date()})
    return subscriptionObject;
}

function getBasicSubObj(sub) {
    return {endpoint: sub.endpoint, keys: {auth: sub.auth, p256dh: sub.p256dh}}
}


exports.getAll = async function () {
    const docs = await db.collection('subscriptions').get();
    const result = []
    docs.forEach(doc => {
        const data = doc.data()
        result.push({...data, id: doc.id, lastResponseDate: data.lastResponseDate.toDate()})
    });
    return result;
}

exports.remove = async function (id) {
    await db.collection('subscriptions').doc(id).delete()
}

exports.updateLastResponseDate = async function (id) {

    const doc = await db.collection('subscriptions').doc(id)
    const data = (await doc.get()).data();
    data.lastResponseDate = new Date();
    await doc.set(data)
}





