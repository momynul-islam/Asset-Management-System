const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/stats").get(dashboardController.getDashboardStats);
router.route("/recentActivities").get(dashboardController.getRecentActivities);
router
  .route("/statsByDepartment")
  .get(dashboardController.getAssetsCountByDepartment);

module.exports = router;
