const QueriesAlerts = require("../database/alerts");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  title: Joi.object({
    en: Joi.string(),
    he: Joi.string(),
    ar: Joi.string(),
  }),

  context: Joi.object({
    en: Joi.string(),
    he: Joi.string(),
    ar: Joi.string(),
  }),
  bloodType: Joi.array().items(Joi.string()),
  member: Joi.boolean(),
  addedDate: Joi.date(),
});

const edit = async (id, alert) => {
  console.log(id, alert);
  if (!id) {
    throw new Error("id should be defined");
  }
  if (schema.validate(alert).error)
    throw new Error(schema.validate(alert).error.message);
  return await QueriesAlerts.edit(id, alert);
};

const get = QueriesAlerts.get;

const del = async (id) => {
  if (!id) {
    throw new Error("id should be defined");
  }

  return await QueriesAlerts.del(id);
};

const add = async (alert) => {
  if (schema.validate(alert).error)
    throw new Error(schema.validate(alert).error);
  return await QueriesAlerts.add(alert);
};

module.exports = {
  edit,
  get,
  del,
  add,
};
