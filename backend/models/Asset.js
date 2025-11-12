const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: [true, "Asset name is required"],
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    origin: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    serialNumber: {
      type: String,
      unique: true,
      required: [true, "Serial number is required"],
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    price: {
      type: Number,
      min: 0,
    },
    assignedDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    warranty: {
      type: String, // "2 years" or "Until 2026-12-31"
    },
    purchaseDate: {
      type: Date,
    },
    installationDate: {
      type: Date,
    },
    room: {
      type: String,
      trim: true,
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    branch: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "in-repair", "inactive", "lost"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Asset", assetSchema);
