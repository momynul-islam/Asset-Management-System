const Activity = require("../models/Activity");
const Asset = require("../models/Asset");
const catchAsync = require("../utils/catchAsync");

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      totalAssets: await Asset.countDocuments(),
      activeAssets: await Asset.countDocuments({ status: "active" }),
      inactiveAssets: await Asset.countDocuments({ status: "inactive" }),
      repairAssets: await Asset.countDocuments({ status: "in-repair" }),
      lostAssets: await Asset.countDocuments({ status: "lost" }),
    },
  });
});

exports.getRecentActivities = catchAsync(async (req, res, next) => {
  const recentActivities = await Activity.find()
    .sort({ createdAt: -1 })
    .limit(10);
  res.status(200).json({
    status: "success",
    data: recentActivities,
  });
});

exports.getAssetsCountByDepartment = catchAsync(async (req, res, next) => {
  const data = await Asset.aggregate([
    {
      $group: {
        _id: "$assignedDepartment", // group by department ObjectId
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "departments", // the collection name in MongoDB
        localField: "_id",
        foreignField: "_id",
        as: "departmentInfo",
      },
    },
    {
      $unwind: { path: "$departmentInfo", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        _id: 0,
        departmentName: "$departmentInfo.name",
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  res.status(200).json({ status: "success", data });
});
