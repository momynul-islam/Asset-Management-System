const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logActivity, getChangesDescription } = require("../utils/helper");

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);

  await logActivity({
    req,
    user: req.user,
    description: `User "${user.name}" created.`,
    type: "user_created",
    room: "userPageRoom",
  });

  res.status(201).json({ status: "success", data: user });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const oldUser = await User.findById(req.params.userId);
  if (!oldUser) return next(new AppError("User not found", 404));

  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  const description = getChangesDescription(oldUser, req.body, "User");

  await logActivity({
    req,
    user: req.user,
    description,
    type: "user_updated",
    room: "userPageRoom",
  });

  res.status(200).json({ status: "success", data: updatedUser });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) return next(new AppError("User not found", 404));

  await logActivity({
    req,
    user: req.user,
    description: `User "${user.name}" deleted.`,
    type: "user_deleted",
    room: "userPageRoom",
  });

  res.status(204).json({ status: "success", data: null });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found with this id", 404));

  res.status(200).json({ status: "success", data: user });
});
