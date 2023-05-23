const {
  createSupplierService,
  getSuppliersService,
  getSupplierService,
  updateSupplierService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the supplier",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the supplier",
    });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await getSuppliersService();
    res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find suppliers",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierService(id);

    if (!supplier) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't find supplier",
      });
    }

    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't find supplier",
    });
  }
};

exports.updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierService(id, req.body);

    if (!result.nModified) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't update the supplier with this id ",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update supplier",
    });
  }
};
