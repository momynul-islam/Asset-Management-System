const mongoose = require("mongoose");
require("dotenv").config();

const { app, io } = require("./app");
const { Socket } = require("socket.io");

const port = process.env.PORT || 3000;

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

    app.listen(port, () => {
      console.log(`Asset Management server listening at port ${port}...`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
