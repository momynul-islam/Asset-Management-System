const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const assetController = require("../controllers/assetController");

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(assetController.getAllAssets)
  .post(authMiddleware.restrictTo("admin"), assetController.createAsset);

router
  .route("/:assetId")
  .get(assetController.getAsset)
  .patch(authMiddleware.restrictTo("admin"), assetController.updateAsset)
  .delete(authMiddleware.restrictTo("admin"), assetController.deleteAsset);

module.exports = router;
