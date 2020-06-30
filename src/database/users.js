const {db} = require('./index')


const addUser = (data) => {
 const res = db.collection('users').doc(data.username).set(data);
}


module.exports = addUser;