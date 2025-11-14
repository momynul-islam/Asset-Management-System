import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("A user connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("A user disconnected:", socket.id);
});

socket.on("connect_error", (err) => {
  if (err.data?.type === "AUTH_ERROR") {
    toast.error(
      err.data.message || "Authentication failed. Please log in again."
    );
  } else {
    toast.error("Socket connection error: " + err.message);
  }
});

export const joinRoom = (roomName) => {
  if (socket.connected) {
    socket.emit("joinRoom", roomName);
    console.log(`Joined room: ${roomName}`);
  } else {
    socket.on("connect", () => {
      socket.emit("joinRoom", roomName);
      console.log(`Joined room after reconnect: ${roomName}`);
    });
  }
};

export const leaveRoom = (roomName) => {
  socket.emit("leaveRoom", roomName);
  console.log(`Left room: ${roomName}`);
};

export const emitEvent = (eventName, data) => {
  socket.emit(eventName, data);
};

export const listenEvent = (eventName, callback) => {
  socket.on(eventName, callback);
};

export const removeListener = (eventName, callback) => {
  socket.off(eventName, callback);
};

export default socket;
