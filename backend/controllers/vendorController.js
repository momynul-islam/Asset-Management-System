const Vendor = require("../models/Vendor");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { logActivity, getChangesDescription } = require("../utils/helper");

exports.createVendor = catchAsync(async (req, res) => {
  const vendor = await Vendor.create(req.body);

  await logActivity({
    req,
    user: req.user,
    description: `Vendor "${vendor.name}" created.`,
    type: "vendor_created",
    room: "vendorPageRoom",
  });

  res.status(201).json({ status: "success", data: vendor });
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

  await logActivity({
    req,
    user: req.user,
    description,
    type: "vendor_updated",
    room: "vendorPageRoom",
  });

  res.status(200).json({ status: "success", data: updatedVendor });
});

exports.deleteVendor = catchAsync(async (req, res, next) => {
  const vendor = await Vendor.findByIdAndDelete(req.params.id);
  if (!vendor) return next(new AppError("Vendor not found", 404));

  await logActivity({
    req,
    user: req.user,
    description: `Vendor "${vendor.name}" deleted.`,
    type: "vendor_deleted",
    room: "vendorPageRoom",
  });

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
