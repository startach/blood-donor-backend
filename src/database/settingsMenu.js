const {db} = require('./index')

const addSettingsMenuItem = (data) => new Promise((resolve, reject) => {
    db.collection('settings_menu').doc().set(data).then(() => {
        resolve(data);
    }).catch((e) => {
        reject(e);
    })
})


const editSettingsMenuItem = (id, data) => new Promise((resolve, reject) => {
    db.collection('settings_menu').doc(id).set(data).then(() => {
        resolve("object updated");
    }).catch((e) => {
        reject(e);
    })
})


const deleteSettingsMenuItem = (id) => new Promise((resolve, reject) => {
    db.collection('settings_menu').doc(id).delete().then(() => {
        resolve("object deleted");
    }).catch((e) => {
        reject(e);
    })
})

const getSettingsMenuItems = () => new Promise(async (resolve, reject) => {
    const alertsRef = db.collection('settings_menu');
    try {
        const doc = await alertsRef.get();
        var result = []
        doc.forEach(doc => {
            result.push({ id:doc.id, ...doc.data() })
        });
        resolve(result);
    } catch (e) {
        reject(e);
    }

});

module.exports = {
    addSettingsMenuItem,
    editSettingsMenuItem,
    deleteSettingsMenuItem,
    getSettingsMenuItems
};