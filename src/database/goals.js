<<<<<<< HEAD
const db = require('./index')
=======
const {db} = require('./index')
const Joi = require('@hapi/joi');
>>>>>>> 9ab3e834293ee8347573fd4892145d32238d19b1

const editGoal = (data) => new Promise( (resolve, reject) => {
    db.collection('general').doc('yearly_goals').set(data).then(()=>{
        resolve('objobject updated');
    }).catch((e)=>{
        reject(e);
    })     
});


const getGoal = () => new Promise(async (resolve, reject) => {
    const goalsRef = db.collection('general').doc('yearly_goals');
    const doucsRef = db.collection('general');
    const doc = await goalsRef.get();
    const ducs = await doucsRef.get();
    if (!doc.exists) {
        return new Error('No such document!')
    } else {
        try {
            const data = await doc.data();
            const id = await doc.id;
            resolve(data);
            console.log(id);
        } catch (e) {
            reject(e);
        }
    }
});


module.exports = { editGoal, getGoal };