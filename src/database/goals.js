const { db } = require('./index')

const edit = async (data) => {
    await db.collection('general').doc('yearly_goals').set(data)
    return 'object updated';
}


const get = async () => {
    const goalsRef = await db.collection('general').doc('yearly_goals');
    const doc = await goalsRef.get();
    if (!doc.exists) {
        return new Error('No such document!')
    } else {
        const data = await doc.data();
        return data;
    }
};

module.exports = { edit, get };