const { db } = require('./index')

const add = async (data) => {
    console.log('----------trying to send-----------')
    await db.collection('alerts').doc().set(data);
    const socket = require('../controllers/socketIo').getConnection()
    socket.emit("FromAPI", data);
    return data
}


const edit = async (id, data) => {

    await db.collection('alerts').doc(id).set(data)
    return "object updated";
}


const del = async (id) => {
    await db.collection('alerts').doc(id).delete()
    return "object deleted";

}

const get = async () => {
    const alertsRef = await db.collection('alerts').orderBy("addedDate", "desc");
    const doc = await alertsRef.get();
    var result = []
    doc.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() })
    });
    return result;
};

module.exports = {
    add,
    edit,
    del,
    get
};