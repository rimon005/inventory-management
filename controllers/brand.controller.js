const {
  createBrandService,
  getBrandsService,
  getBrandService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsService();
    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find brands",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandService(id);

    if (!brand) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't find brand",
      });
    }

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find brand",
    });
  }
};

exports.updateBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);

    if (!result.nModified) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't update the brand with this id ",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update brand",
    });
  }
};
