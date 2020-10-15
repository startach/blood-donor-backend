const QueriesGeneralSetting = require("../database/generalSetting");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  title: Joi.object({
    en: Joi.string(),
    he: Joi.string(),
    ar: Joi.string(),
  }),
  contextType: Joi.string(),
  context: Joi.string(),
});

const add = async (setting) => {
  if (schema.validate(setting).error)
    throw new Error(schema.validate(setting).error);
  return await QueriesGeneralSetting.add(setting);
};
const get = QueriesGeneralSetting.get;

module.exports = {
  add,
  get,
};
