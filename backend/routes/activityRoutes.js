const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const activityController = require("../controllers/activityController");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/", activityController.getAllActivities);

router.get("/asset/:assetId", activityController.getActivityByAsset);

router.get("/user/:userId", activityController.getActivityByUser);

module.exports = router;
