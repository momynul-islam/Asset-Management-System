const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(authMiddleware.restrictTo("admin"), userController.createUser);

router
  .route("/:userId")
  .get(userController.getUser)
  .patch(authMiddleware.restrictTo("admin"), userController.updateUser)
  .delete(authMiddleware.restrictTo("admin"), userController.deleteUser);

module.exports = router;
