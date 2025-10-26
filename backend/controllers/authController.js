const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { promisify } = require("util");

const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const createSendToken = catchAsync(async (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined; // Remove password before sending

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role, department } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
    department,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  createSendToken(user, 200, req, res);
});
