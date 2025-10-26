const Department = require("../models/Department");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { logActivity, getChangesDescription } = require("../utils/helper");

exports.createDepartment = catchAsync(async (req, res) => {
  const department = await Department.create(req.body);

  await logActivity({
    req,
    user: req.user,
    description: `Department "${department.name}" created.`,
    type: "department_created",
    room: "departmentPageRoom",
  });

  res.status(201).json({ status: "success", data: department });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
  const oldDept = await Department.findById(req.params.id);
  if (!oldDept) return next(new AppError("Department not found", 404));

  const updatedDept = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  const description = getChangesDescription(oldDept, req.body, "Department");

  await logActivity({
    req,
    user: req.user,
    description,
    type: "department_updated",
    room: "departmentPageRoom",
  });

  res.status(200).json({ status: "success", data: updatedDept });
});

exports.deleteDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findByIdAndDelete(req.params.id);
  if (!department) return next(new AppError("Department not found", 404));

  await logActivity({
    req,
    user: req.user,
    description: `Department "${department.name}" deleted.`,
    type: "department_deleted",
    room: "departmentPageRoom",
  });

  res.status(204).json({ status: "success", data: null });
});

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const departments = await Department.find();
  res.status(200).json({
    status: "success",
    data: departments,
  });
});

exports.getDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id);
  if (!department)
    return next(new AppError("Department not found with this id", 404));

  res.status(200).json({ status: "success", data: department });
});
