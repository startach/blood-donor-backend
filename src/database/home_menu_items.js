const db = require('./index')


const addHomeMenueItem= (data) => {
 const res = db.collection('home_menu').doc(data.title.en).set(data);
}


module.exports = {addHomeMenueItem};