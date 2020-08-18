const { db } = require('./index')

const add = async (data) => {
    try {
        await db.collection('home_menu').doc().set(data)
        return data
    } catch (e) {
        throw new Error(e)
    }
}




const edit = async (id, data) => {
    try {
        await db.collection('home_menu').doc(id).set(data)
        return "object updated";
    } catch (e) {
        throw new Error(e);
    }
}



const del = async (id) => {
    try {
        await db.collection('home_menu').doc(id).delete()
        return "object deleted";
    }
    catch (e) {
        throw new Error(e);
    }
}


const get = async () => {
    try {
        const alertsRef = await db.collection('home_menu');
        const doc = await alertsRef.get();
        var result = []
        doc.forEach(doc => {
            result.push({ id: doc.id, ...doc.data() })
        });
        return result;
    } catch (e) {
        throw new Error(e);
    }

}


module.exports = {
    add,
    edit,
    delete:del,
    get
};