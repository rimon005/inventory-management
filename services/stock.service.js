const Stock = require("../models/Stock");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, queries) => {
  const stock = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
  const totalProducts = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, stock };
};

exports.createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};

exports.getStockServiceById = async (id) => {
  //basic system -->
  // const stock = await Stock.find({ _id: id })
  //   .populate("store.id")
  //   .populate("suppliedBy.id")
  //   .populate("brand.id");

  //aggregate method -->

  const stock = await Stock.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $project: {
        category: 1,
        quantity: 1,
        price: 1,
        productId: 1,
        name: 1,
        "brand.name": { $toLower: "$brand.name" },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.id",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);
  return stock;
};
exports.updateStockServiceById = async (id, data) => {
  const stock = await Stock.updateOne({ _id: id }, data);
  return stock;
};
