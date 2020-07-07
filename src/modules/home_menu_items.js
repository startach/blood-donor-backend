const { addHomeMenuItem,editHomeMenuItem, deleteHomeMenuItem,getHomeMenuItems,swapHomeMenuItems } = require('../database/home_menu_items');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.object({
        en: Joi.string(),
        he: Joi.string(),
        ar: Joi.string()
    }),
    src: Joi.string(),
    redirectionLink: Joi.string(),
    addedDate: Joi.date()
})

const homeMenuItemEdit = async (id, item) => {
    if(!id)
        throw new Error("id should be defined");

    if (schema.validate(item).error)
        throw new Error(schema.validate(item).error.message);

    return await editHomeMenuItem(id,item);
}


const homeMenuItemsGet = getHomeMenuItems;


const homeMenuItemDelete = async (id) => {
    if(!id)
        throw new Error("id should be defined");


    return await deleteHomeMenuItem(id)

}

const homeMenuItemAdd = async (item) => {
    if (schema.validate(item).error)
        throw new Error(schema.validate(item).error);
    return await addHomeMenuItem(item);
}

const homeMenuSwapItems = async (id1, id2) => {
    await swapHomeMenuItems(id1, id2);
}



module.exports = {
    homeMenuItemEdit,
    homeMenuItemsGet,
    homeMenuItemDelete,
    homeMenuItemAdd,
    homeMenuSwapItems
}