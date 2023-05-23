const {
  createCategoryService,
  getCategoryService,
  getCategoryServiceById,
  updateCategoryServiceById,
} = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the category",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the category",
    });
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const result = await getCategoryService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find categories",
    });
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryServiceById(id);

    if (!category) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't find the category with this id ",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find category",
    });
  }
};

exports.updateCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await updateCategoryServiceById(id, req.body);

    if (!category) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't update the category with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the  category with this id ",
    });
  }
};
