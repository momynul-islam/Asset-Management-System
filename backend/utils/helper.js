const Activity = require("../models/Activity");
const AppError = require("./AppError");

exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toISOString().split("T")[0];
}

exports.getChangesDescription = (oldDoc, newData, entityName = "Item") => {
  const changes = [];

  Object.keys(newData).forEach((key) => {
    let oldValue = oldDoc[key];
    let newValue = newData[key];

    if (oldValue instanceof Date || newValue instanceof Date) {
      oldValue = formatDate(oldValue);
      newValue = formatDate(newValue);
    }

    if (oldValue?.toString() !== newValue?.toString()) {
      changes.push(
        `${key} changed from "${oldValue || "N/A"}" → "${newValue || "N/A"}"`
      );
    }
  });

  return changes.length > 0
    ? `${changes.join(", ")}`
    : `${entityName} updated.`;
};

exports.emitEvent = (req, event, data, room = null) => {
  const io = req.app.get("io");
  if (!io) {
    console.warn("⚠️ Socket.IO not initialized.");
    return;
  }

  if (room) {
    // Emit to a specific room
    io.to(room).emit(event, data);
  } else {
    // Emit to all connected clients
    io.emit(event, data);
  }
};

exports.logActivity = async ({ req, activityObject }) => {
  try {
    const activity = await Activity.create(activityObject);

    this.emitEvent(req, "activity_created", activity, "ActivityRoom");
  } catch (err) {
    console.error("Error logging activity:", err.message);
  }
};
