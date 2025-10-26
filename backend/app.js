const http = require("http");

const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const vendorRouter = require("./routes/vendorRoutes");
const assetRouter = require("./routes/assetRoutes");
const userRouter = require("./routes/userRoutes");
const activityRouter = require("./routes/activityRoutes");
const AppError = require("./utils/AppError");
const errorController = require("./controllers/errorController");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Store io globally so controllers can access it
app.set("io", io);

app.use(bodyParser.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auths/", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/assets", assetRouter);
app.use("/api/v1/activities", activityRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorController);

module.exports = { app, io };
