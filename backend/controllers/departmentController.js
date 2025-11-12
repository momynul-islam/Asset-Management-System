const Department = require("../models/Department");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const {
  logActivity,
  getChangesDescription,
  emitEvent,
} = require("../utils/helper");
const { default: mongoose } = require("mongoose");

exports.createDepartment = catchAsync(async (req, res) => {
  const newDepartment = await Department.create(req.body);

  const activityObject = {
    departmentCode: newDepartment.departmentCode,
    instanceOf: "Department",
    type: "department_created",
    description: `Department "${newDepartment.name}" created.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "department_created", newDepartment, "DepartmentRoom");

  res.status(201).json({ status: "success", data: newDepartment });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
  const oldDepartment = await Department.findById(req.params.departmentId);
  if (!oldDepartment) return next(new AppError("Department not found", 404));

  const updatedDepartment = await Department.findByIdAndUpdate(
    req.params.departmentId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate("headOfDepartment");

  const description = getChangesDescription(
    oldDepartment,
    req.body,
    "Department"
  );

  const activityObject = {
    departmentCode: updatedDepartment.departmentCode,
    instanceOf: "Department",
    type: "department_updated",
    description,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "department_updated", updatedDepartment, "DepartmentRoom");

  res.status(200).json({ status: "success", data: updatedDepartment });
});

exports.deleteDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findByIdAndDelete(
    req.params.departmentId
  );
  if (!department) return next(new AppError("Department not found", 404));

  const activityObject = {
    departmentCode: department.departmentCode,
    instanceOf: "Department",
    type: "department_deleted",
    description: `Department "${department.name}" deleted.`,
    performedBy: req.user.name,
  };
  await logActivity({
    req,
    activityObject,
  });

  emitEvent(req, "department_deleted", department, "DepartmentRoom");

  res.status(204).json({ status: "success", data: null });
});

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const departments = await Department.find().populate("headOfDepartment");

  res.status(200).json({
    status: "success",
    data: departments,
  });
});

exports.getDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.departmentId);
  if (!department)
    return next(new AppError("Department not found with this id", 404));

  res.status(200).json({ status: "success", data: department });
});
