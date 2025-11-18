const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const vendorRouter = require("./routes/vendorRoutes");
const assetRouter = require("./routes/assetRoutes");
const userRouter = require("./routes/userRoutes");
const activityRouter = require("./routes/activityRoutes");
const AppError = require("./utils/AppError");
const errorController = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/assets", assetRouter);
app.use("/api/v1/activities", activityRouter);

app.all("", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
