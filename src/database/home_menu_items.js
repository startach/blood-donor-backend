const {db} = require('./index')

const addHomeMenuItem = (data) => new Promise((resolve, reject) => {
    db.collection('home_menu').doc().set(data).then(() => {
        resolve(data);
    }).catch((e) => {
        reject(e);
    })
})


const editHomeMenuItem = (id, data) => new Promise((resolve, reject) => {
    db.collection('home_menu').doc(id).set(data).then(() => {
        resolve("object updated");
    }).catch((e) => {
        reject(e);
    })
})


const deleteHomeMenuItem = (id) => new Promise((resolve, reject) => {
    db.collection('home_menu').doc(id).delete().then(() => {
        resolve("object deleted");
    }).catch((e) => {
        reject(e);
    })
})

const getHomeMenuItems = () => new Promise(async (resolve, reject) => {
    const alertsRef = db.collection('home_menu');
    try {
        const doc = await alertsRef.get();
        var result = []
        doc.forEach(doc => {
            result.push({ [doc.id]: doc.data() })
        });
        resolve(result);
    } catch (e) {
        reject(e);
    }

});

module.exports = {
    addHomeMenuItem,
    editHomeMenuItem,
    deleteHomeMenuItem,
    getHomeMenuItems
};