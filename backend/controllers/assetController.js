const Asset = require("../models/Asset");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { logActivity, getChangesDescription } = require("../utils/helper");

exports.createAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.create(req.body);

  await logActivity({
    req,
    user: req.user,
    asset,
    description: `Asset "${asset.name}" created.`,
    type: "asset_created",
    room: "assetPageRoom",
  });

  res.status(201).json({ status: "success", data: asset });
});

exports.updateAsset = catchAsync(async (req, res, next) => {
  const oldAsset = await Asset.findById(req.params.assetId);
  if (!oldAsset) return next(new AppError("Asset not found", 404));

  const updatedAsset = await Asset.findByIdAndUpdate(
    req.params.assetId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  const description = getChangesDescription(oldAsset, req.body, "Asset");

  await logActivity({
    req,
    user: req.user,
    asset: updatedAsset,
    description,
    type: "asset_updated",
    room: "assetPageRoom",
  });

  res.status(200).json({ status: "success", data: updatedAsset });
});

exports.deleteAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndDelete(req.params.assetId);
  if (!asset) return next(new AppError("Asset not found", 404));

  await logActivity({
    req,
    user: req.user,
    asset,
    description: `Asset "${asset.name}" deleted.`,
    type: "asset_deleted",
    room: "assetPageRoom",
  });

  res.status(204).json({ status: "success", data: null });
});

exports.getAllAssets = catchAsync(async (req, res) => {
  const assets = await Asset.find().populate(
    "department assignedDepartment assignedUser vendor"
  );
  res.status(200).json({ status: "success", data: assets });
});

exports.getAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findById(req.params.assetId).populate(
    "department assignedDepartment assignedUser vendor"
  );
  if (!asset) return next(new AppError("Asset not found", 404));
  res.status(200).json({ status: "success", data: asset });
});
