const express = require("express");
const categoryController = require("../controllers/category.controller.js");
const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategory);

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategoryById);

module.exports = router;
