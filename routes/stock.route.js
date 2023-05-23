const express = require("express");
const stockController = require("../controllers/stock.controller.js");
const router = express.Router();

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);
router
  .route("/:id")
  .get(stockController.getStockById)
  .patch(stockController.updateStockById);

module.exports = router;
