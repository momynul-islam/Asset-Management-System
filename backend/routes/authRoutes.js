const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.patch(
  "/updateMyPassword",
  authMiddleware.protect,
  authController.updatePassword
);

module.exports = router;
