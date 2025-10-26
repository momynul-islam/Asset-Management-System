exports.filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getChangesDescription = (oldDoc, newData, entityName = "Item") => {
  const changes = [];

  Object.keys(newData).forEach((key) => {
    const oldValue = oldDoc[key];
    const newValue = newData[key];

    if (oldValue?.toString() !== newValue?.toString()) {
      changes.push(
        `${key} changed from "${oldValue || "N/A"}" → "${newValue || "N/A"}"`
      );
    }
  });

  return changes.length > 0
    ? `${entityName} updated: ${changes.join(", ")}`
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

exports.logActivity = async ({ req, user, asset, description, type, room }) => {
  try {
    const activity = await Activity.create({
      user: user?._id,
      performedBy: user?.name || "System",
      asset: asset?._id,
      assetName: asset?.name,
      serialNumber: asset?.serialNumber,
      description,
      type,
      createdAt: new Date(),
    });

    // Emit to room if provided, else broadcast to all
    exports.emitEvent(req, type, activity, room || "activityPageRoom");
  } catch (err) {
    console.error("❌ Error logging activity:", err.message);
  }
};
