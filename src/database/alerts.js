const {db} = require('./index')


const addAlert = (data) => {
 const res = db.collection('alerts').doc(data.title.en).set(data);
}


module.exports = {addAlert};