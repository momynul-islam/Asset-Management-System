const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  logActivity,
  getChangesDescription,
  emitEvent,
} = require("../utils/helper");

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const activityObject = {
    userId: newUser.userId,
    instanceOf: "User",
    type: "user_created",
    description: `User "${newUser.name}" created.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "user_created", newUser, "UserRoom");

  res.status(201).json({ status: "success", data: newUser });
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

  const activityObject = {
    userId: updatedUser.userId,
    instanceOf: "User",
    type: "user_updated",
    description,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "user_updated", updatedUser, "UserRoom");

  res.status(200).json({ status: "success", data: updatedUser });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) return next(new AppError("User not found", 404));

  const activityObject = {
    userId: user.userId,
    instanceOf: "User",
    type: "user_deleted",
    description: `User "${user.name}" deleted.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "user_deleted", user, "UserRoom");

  res.status(204).json({ status: "success", data: null });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found with this id", 404));

  res.status(200).json({ status: "success", data: user });
});
