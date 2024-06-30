import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FORNTEND_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// SOCKET FUNCTIONS
const socketUsersMap = new Map<string, string>(); // Map of all the online users

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  console.log(userId, " :user connected:", socket.id);
  // iF userId exists add it to onlineUsers Map
  if (userId) socketUsersMap.set(userId, socket.id);
  console.log(socketUsersMap);
  // Emit event of updated onlineUsers to all connected clients
  io.emit("getOnlineUsers", Array.from(socketUsersMap.keys()));
  console.log("map=", Array.from(socketUsersMap.keys()));

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    // Remove the user from the onlineUsers map on disconnect
    socketUsersMap.delete(userId);
    console.log(socketUsersMap);
  });
});

export { app, io, server };
