const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js");
const uploader = require("../middleware/uploader.js");
// fileUploader route

router.post(
  "/file-upload",
  uploader.single("image"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateController);
router.route("/bulk-delete").delete(productController.bulkDeleteController);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);
module.exports = router;
