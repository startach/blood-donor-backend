const { db } = require("./index");

const add = async (data) => {
  await db.collection("generalSetting").doc().set(data);
  return data;
};
const get = async () => {
  const settingGeneralRef = await db.collection("generalSetting");
  const doc = await settingGeneralRef.get();
  var result = [];
  doc.forEach((doc) => {
    const data = doc.data();

    result.push({ id: doc.id, ...data });
  });
  return result;
};

module.exports = {
  add,
  get,
};
