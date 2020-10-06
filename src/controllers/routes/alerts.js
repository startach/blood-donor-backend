const ModelsAlerts = require("../../models/alerts");
const apiResponse = require("../../models/apiResponse");
const moment = require("moment");

exports.get = async (req, res, next) => {
  try {
    let data = await ModelsAlerts.get();
    data = data.map((x) => ({
      ...x,
      addedDate: x.addedDate.toISOString(),
      expDate: moment(x.expDate).format("YYYY-MM-DD"),
    }));
    res.render("alerts", { data, selectedNavbarItem: "alerts" });
  } catch (e) {
    next(e);
  }
};

exports.post = async ({ params: { id }, body }, res) => {
  console.log(body);
  await ModelsAlerts.edit(id, {
    title: {
      he: body.title_he,
      en: body.title_en,
      ar: body.title_ar,
    },
    context: {
      he: body.context_he,
      en: body.context_en,
      ar: body.context_ar,
    },
    bloodType: Object.keys(body)
      .filter((x) => x.includes("bloodType"))
      .map((x) => body[x]),
    expDate: moment(body.expDate, "YYYY-MM-DD").toDate(),
    addedDate: moment(body.addedDate).toDate(),
  });
  res.redirect("/alerts");
};

exports.delete = async ({ params: { id } }, res) => {
  await ModelsAlerts.del(id);
  res.end();
};

exports.add = async (req, res) => {
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
    apiResponse(res, { message: "server error", code: 500 });
  }
};
