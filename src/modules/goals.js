 const { getGoal, editGoal } = require('../database/goals');

const goalEdit = (current, goal) => {
    if (!current || typeof current !== 'number')
        return new Error('current should be defined as number');

    if (current < 0) {
        return new Error('current should be bigger than zero');
    }

    if (!goal || typeof goal !== 'number')
        return new Error('current should be defined as number');

    if (goal < 0) {
        return new Error('current should be bigger than zero');
    }

    result = editGoal({ "current" : current, "goal": goal })

    if (typeof result === 'Error') {
        return result
    }
}


const goalGet = () => {
    return getGoal();
}
    


module.exports = {
    goalEdit,
    goalGet
}