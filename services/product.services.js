const Product = require("../models/Product.js");
const Brand = require("../models/Brand.js");

exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);

  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  // step 1 get brand -> step 2 update the Brand model
  const { _id: productId, brand } = product;
  const res = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  return product;
};

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // const result = await Product.updateMany(
  //   { _id: data.ids },
  //   { $set: data.data },
  //   { runValidators: true }
  // );

  const products = [];

  data.ids.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, { $set: product.data })
    );
  });

  const result = await Promise.all(products);
  console.log(result);

  return result;
};

exports.deleteProductService = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

exports.bulkDeletedProductService = async (ids) => {
  const result = await Product.deleteMany({});

  return result;
};
