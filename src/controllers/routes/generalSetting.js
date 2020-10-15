const ModelsGeneralSetting = require("../../models/generalSetting");
const apiResponse = require("../../models/apiResponse");

exports.add = async (req, res) => {
  console.log(req.body);
  try {
    await ModelsGeneralSetting.add(req.body);
    apiResponse(res, { message: " added successfully" });
  } catch ({ message }) {
    apiResponse(res, { message, code: 500 });
  }
};

exports.getGeneralSettingApi = async (req, res) => {
  try {
    const data = (await ModelsGeneralSetting.get()) || [];
    apiResponse(res, { data });
  } catch (e) {
    console.log(e.message);
    apiResponse(res, { message: "server error", code: 500 });
  }
};
