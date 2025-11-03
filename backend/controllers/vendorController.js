const Vendor = require("../models/Vendor");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const {
  logActivity,
  getChangesDescription,
  emitEvent,
} = require("../utils/helper");

exports.createVendor = catchAsync(async (req, res) => {
  const newVendor = await Vendor.create(req.body);

  const activityObject = {
    vendorCode: newVendor.vendorCode,
    instanceOf: "Vendor",
    type: "vendor_created",
    description: `Vendor "${newVendor.name}" created.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "vendor_created", newVendor, "VendorRoom");

  res.status(201).json({ status: "success", data: newVendor });
});

exports.updateVendor = catchAsync(async (req, res, next) => {
  const oldVendor = await Vendor.findById(req.params.id);
  if (!oldVendor) return next(new AppError("Vendor not found", 404));

  const updatedVendor = await Vendor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  const description = getChangesDescription(oldVendor, req.body, "Vendor");

  const activityObject = {
    vendorCode: updatedVendor.vendorCode,
    instanceOf: "Vendor",
    type: "vendor_updated",
    description: `Vendor "${updatedVendor.name}" updated.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "vendor_updated", updatedVendor, "VendorRoom");

  res.status(200).json({ status: "success", data: updatedVendor });
});

exports.deleteVendor = catchAsync(async (req, res, next) => {
  const vendor = await Vendor.findByIdAndDelete(req.params.id);
  if (!vendor) return next(new AppError("Vendor not found", 404));

  const activityObject = {
    vendorCode: vendor.vendorCode,
    instanceOf: "Vendor",
    type: "vendor_deleted",
    description: `Vendor "${vendor.name}" deleted.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "vendor_deleted", vendor, "VendorRoom");

  res.status(204).json({ status: "success", data: null });
});

exports.getAllVendors = catchAsync(async (req, res, next) => {
  const vendors = await Vendor.find();
  res.status(200).json({
    status: "success",
    data: vendors,
  });
});

exports.getVendor = catchAsync(async (req, res, next) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return next(new AppError("Vendor not found with this id", 404));

  res.status(200).json({ status: "success", data: vendor });
});
