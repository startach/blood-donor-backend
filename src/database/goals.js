const db = require('./index')

const editGoal = (data) => new Promise( (resolve, reject) => {
    db.collection('general').doc('yearly_goals').set(data).then(()=>{
        resolve('objobject updated');
    }).catch((e)=>{
        reject(e);
    })     
});


const getGoal = () => new Promise(async (resolve, reject) => {
    const goalsRef = db.collection('general').doc('yearly_goals');
    const doc = await goalsRef.get();
    if (!doc.exists) {
        return new Error('No such document!')
    } else {
        try {
            const data = await doc.data();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    }
});


module.exports = { editGoal, getGoal };