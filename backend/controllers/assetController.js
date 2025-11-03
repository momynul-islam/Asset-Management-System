const Asset = require("../models/Asset");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  logActivity,
  getChangesDescription,
  emitEvent,
} = require("../utils/helper");

exports.createAsset = catchAsync(async (req, res, next) => {
  const newAsset = await Asset.create(req.body);

  const activityObject = {
    assetSerialNumber: newAsset.serialNumber,
    instanceOf: "Asset",
    type: "asset_created",
    description: `Asset "${newAsset.name}" created.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "asset_created", newAsset, "AssetRoom");

  res.status(201).json({ status: "success", data: newAsset });
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

  const activityObject = {
    assetSerialNumber: updatedAsset.serialNumber,
    instanceOf: "Asset",
    type: "asset_updated",
    description,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "asset_updated", updatedAsset, "AssetRoom");

  res.status(200).json({ status: "success", data: updatedAsset });
});

exports.deleteAsset = catchAsync(async (req, res, next) => {
  const asset = await Asset.findByIdAndDelete(req.params.assetId);
  if (!asset) return next(new AppError("Asset not found", 404));

  const activityObject = {
    assetSerialNumber: asset.serialNumber,
    instanceOf: "Asset",
    type: "asset_deleted",
    description: `Asset "${asset.name}" deleted.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "asset_deleted", asset, "AssetRoom");

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
