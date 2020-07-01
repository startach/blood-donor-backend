const {db} = require('./index')

const addAlert = (data) => new Promise((resolve, reject) => {
    db.collection('alerts').doc().set(data).then(() => {
        resolve(data);
    }).catch((e) => {
        reject(e);
    })
})


const editAlert = (id, data) => new Promise((resolve, reject) => {
    db.collection('alerts').doc(id).set(data).then(() => {
        resolve("object updated");
    }).catch((e) => {
        reject(e);
    })
})


const deleteAlert = (id) => new Promise((resolve, reject) => {
    db.collection('alerts').doc(id).delete().then(() => {
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
            result.push({ id:[doc.id], ...doc.data() })
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