const { addHomeMenuItem,editHomeMenuItem, deleteHomeMenuItem,getHomeMenuItems } = require('../database/home_menu_items');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    src: Joi.string(),
    redirectionLink: Joi.string(),
})

const homeMenuItemEdit = (id, item) => {
    if(!id){
        return new Error("id should be defined");
    }
    if (schema.validate(item).error)
        return (schema.validate(item).error.message);

    return editHomeMenuItem(id,item);
}


const homeMenuItemsGet = () => {
    return getHomeMenuItems();
}

const homeMenuItemDelete = (id) => {
    if(!id){
        return new Error("id should be defined");
    }

    return deleteHomeMenuItem(id)

}

const homeMenuItemAdd = (item) => {
    if (schema.validate(item).error)
        return (schema.validate(item).error.message);
    return addHomeMenuItem(item);
}



module.exports = {
    homeMenuItemEdit,
    homeMenuItemsGet,
    homeMenuItemDelete,
    homeMenuItemAdd
}