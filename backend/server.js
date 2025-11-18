const http = require("http");

const mongoose = require("mongoose");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

app.set("io", io);

io.use((socket, next) => {
  const token = socket.handshake.headers.cookie
    ?.split("; ")
    .find((c) => c.startsWith("jwt="))
    ?.split("=")[1];

  if (!token) {
    const err = new Error("No token provided");
    err.data = { type: "AUTH_ERROR", message: "Authentication required" };
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // socket.user = decoded;
    next();
  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.data = { type: "AUTH_ERROR", message: "Session expired" };
    next(error);
  }
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to the database.");

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
      });

      socket.on("leaveRoom", (room) => {
        socket.leave(room);
        console.log(`Socket ${socket.id} left room ${room}`);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });

    server.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  })
  .catch((err) => console.log("DB connection error:", err));
