const {
  getStockService,
  createStockService,
  getStockServiceById,
  updateStockServiceById,
} = require("../services/stock.service");

exports.getStocks = async (req, res, next) => {
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

    const stocks = await getStockService(filters, queries);

    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "can't get the data",
      error: error,
    });
  }
};

exports.createStock = async (req, res) => {
  try {
    const stock = await createStockService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the stock",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't created the stock",
    });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await getStockServiceById(id);
    if (!stock) {
      res.status(400).json({
        status: "fail",
        message: "Could't find the stock with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find the stock with this id",
    });
  }
};

exports.updateStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await updateStockServiceById(id, req.body);
    res.status(200).json({
      status: "success",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the stock with this id",
    });
  }
};
