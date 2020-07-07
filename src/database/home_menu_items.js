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
    const alertsRef = db.collection('home_menu').orderBy("addedDate");
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


const swapHomeMenuItems = async (id1, id2) => {

    const collection = db.collection('home_menu')
    const item1 = (await collection.doc(id1).get()).data()
    const item2 = (await collection.doc(id2).get()).data()
    await collection.doc(id1).set({...item1, addedDate: item2["addedDate"]})
    await collection.doc(id2).set({...item2, addedDate: item1["addedDate"]})

}


module.exports = {
    addHomeMenuItem,
    editHomeMenuItem,
    deleteHomeMenuItem,
    getHomeMenuItems,
    swapHomeMenuItems
};