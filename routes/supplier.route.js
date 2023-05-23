const express = require("express");
const supplierController = require("../controllers/supplier.controller.js");
const router = express.Router();

router
  .route("/")
  .post(supplierController.createSupplier)
  .get(supplierController.getSuppliers);

router
  .route("/:id")
  .get(supplierController.getSupplierById)
  .patch(supplierController.updateSupplierById);

module.exports = router;
