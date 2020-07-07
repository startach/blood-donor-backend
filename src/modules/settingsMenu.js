const { addSettingsMenuItem,editSettingsMenuItem,deleteSettingsMenuItem,getSettingsMenuItems } = require('../database/settingsMenu');
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

const settingsMenuItemEdit = async (id, item) => {
    if(!id)
        throw new Error("id should be defined");

    if (schema.validate(item).error)
        throw new Error(schema.validate(item).error.message);

    return await editSettingsMenuItem(id,item);
}


const settingsMenuItemsGet = getSettingsMenuItems;


const settingsMenuItemDelete = async (id) => {
    if(!id)
        throw new Error("id should be defined");


    return await deleteSettingsMenuItem(id)

}

const settingsMenuItemAdd = async (item) => {
    if (schema.validate(item).error)
        throw new Error(schema.validate(item).error);
    return await addSettingsMenuItem(item);
}



module.exports = {
    settingsMenuItemEdit,
    settingsMenuItemsGet,
    settingsMenuItemDelete,
    settingsMenuItemAdd
}