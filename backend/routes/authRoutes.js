const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/getCurrentUser", authMiddleware.protect, (req, res) => {
  return res.status(200).json({
    status: "success",
    data: req.user,
  });
});

router.patch(
  "/updateMyPassword",
  authMiddleware.protect,
  authController.updatePassword
);

module.exports = router;
