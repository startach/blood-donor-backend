const {db} = require('./index')
const deepEquals = require("deep-equal")
exports.add = async function add(subscriptionObject) {
    let data = await exports.getAll();
    data= data.filter(x =>deepEquals(subscriptionObject, x))
    if(data.length)
        return subscriptionObject;

    await db.collection("subscriptions").set(subscriptionObject)
    return subscriptionObject;
}

exports.getAll = async function getAll() {
    const docs = await db.collection('subscriptions').get();
    const result = []
    docs.forEach(doc => {
        const data = doc.data()
        result.push(data)
    });
    return result;
}


