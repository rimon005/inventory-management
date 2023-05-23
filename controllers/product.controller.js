const {
  getProductsService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductService,
  bulkDeletedProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    // sort , page , limit -> exclude

    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach((field) => delete filters[field]);

    // console.log("original query ", req.query);
    // console.log("query object", filters);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      // console.log(sortBy);
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;

      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }

    // gt , lt , gte , lte

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);

    const products = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "can't get the data",
      error: error,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await updateProductService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateController = async (req, res, next) => {
  try {
    const product = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Data updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteProductService(id);

    if (!product.deletedCount) {
      res.status(404).json({
        status: "fail",
        error: "Couldn't deleted the product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteController = async (req, res, next) => {
  try {
    const product = await bulkDeletedProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "Data deleted  successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Couldn't deleted given the product",
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res, next) => {
  try {
    res.status(200).json(req.files);
  } catch (error) {}
};
