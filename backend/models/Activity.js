const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["repair", "update", "transfer", "note"],
      default: "note",
    },
    description: {
      type: String,
      required: [true, "Activity description is required"],
      trim: true,
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
