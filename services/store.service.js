const Store = require("../models/Store");

exports.getStoreService = async () => {
  const store = await Store.find({});
  return store;
};

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.getStoreServiceById = async (id) => {
  const store = await Store.find({ _id: id });
  return store;
};
exports.updateStoreServiceById = async (id, data) => {
  const store = await Store.updateOne({ _id: id }, data);
  return store;
};
