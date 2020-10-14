const ModelsAlerts = require("../../models/alerts");
const apiResponse = require("../../models/apiResponse");
const moment = require("moment");

exports.get = async (req, res, next) => {
  try {
    let data = await ModelsAlerts.get();
    data = data.map((x) => ({
      ...x,
      addedDate: x.addedDate.toISOString(),
    }));
    res.render("alerts", { data, selectedNavbarItem: "alerts" });
  } catch (e) {
    next(e);
  }
};

exports.post = async ({ params: { id }, body }, res) => {
  try {
    await ModelsAlerts.edit(id, {
      ...body,
      addedDate: moment(body.addedDate).toDate(),
    });
    apiResponse(res, { message: " edit successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.delete = async ({ params: { id } }, res) => {
  try {
    console.log(id);
    await ModelsAlerts.del(id);
    apiResponse(res, { message: " deleted successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.add = async (req, res) => {
  console.log(req.body);
  const newAlert = req.body;
  try {
    await ModelsAlerts.add({ ...newAlert, addedDate: new Date() });
    apiResponse(res, { message: " added successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.getAlertsApi = async (req, res) => {
  try {
    const data = (await ModelsAlerts.get()) || [];
    apiResponse(res, { data });
  } catch (e) {
    console.log(e.message);
    apiResponse(res, { message: "server error", code: 500 });
  }
};
