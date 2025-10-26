const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const vendorController = require("../controllers/vendorController");

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(vendorController.getAllVendors)
  .post(authMiddleware.restrictTo("admin"), vendorController.createVendor);

router
  .route("/:vendorId")
  .get(vendorController.getVendor)
  .patch(authMiddleware.restrictTo("admin"), vendorController.updateVendor)
  .delete(authMiddleware.restrictTo("admin"), vendorController.deleteVendor);

module.exports = router;
