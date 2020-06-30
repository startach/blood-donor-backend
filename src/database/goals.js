const db = require('./index')


const editGoal= (data) => {
 const res = db.collection('general').doc('yearly_goals').set(data);
}


module.exports = {editGoal};