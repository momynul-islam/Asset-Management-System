const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    assetSerialNumber: {
      type: String,
    },
    userId: {
      type: String,
    },
    departmentCode: {
      type: String,
    },
    vendorCode: {
      type: String,
    },
    instanceOf: {
      type: String,
      enum: ["Assset", "Department", "Vendor", "User"],
      required: [true, "Activity instance of is required"],
    },
    type: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Activity description is required"],
      trim: true,
    },
    performedBy: {
      type: String,
      required: [true, "Activity performedby is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
