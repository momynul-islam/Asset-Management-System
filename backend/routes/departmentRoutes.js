const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const departmentController = require("../controllers/departmentController");

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(
    authMiddleware.restrictTo("admin"),
    departmentController.createDepartment
  );

router
  .route("/:departmentId")
  .get(departmentController.getDepartment)
  .patch(
    authMiddleware.restrictTo("admin"),
    departmentController.updateDepartment
  )
  .delete(
    authMiddleware.restrictTo("admin"),
    departmentController.deleteDepartment
  );

module.exports = router;
