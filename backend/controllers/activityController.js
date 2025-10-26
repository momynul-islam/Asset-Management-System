const catchAsync = require("../utils/catchAsync");
const Activity = require("../models/Activity");

exports.getAllActivities = catchAsync(async (req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 });
  res.status(200).json({ status: "success", data: activities });
});

exports.getActivityByAsset = catchAsync(async (req, res) => {
  const { assetId } = req.params;
  const activities = await Activity.find({ asset: assetId }).sort({
    createdAt: -1,
  });
  res.status(200).json({ status: "success", data: activities });
});

exports.getActivityByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const activities = await Activity.find({ user: userId }).sort({
    createdAt: -1,
  });
  res.status(200).json({ status: "success", data: activities });
});
