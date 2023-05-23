const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

exports.getCategoryService = async () => {
  const category = await Category.find({});
  return category;
};

exports.getCategoryServiceById = async (id) => {
  const category = await Category.findOne({ _id: id });
  return category;
};

exports.updateCategoryServiceById = async (id, data) => {
  const category = await Category.updateOne({ _id: id }, data);
  return category;
};
