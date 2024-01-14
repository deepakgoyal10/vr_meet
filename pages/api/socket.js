import { Server } from "socket.io";
import Cors from "cors";

const cors = Cors({ origin: "https://vr-meet.vercel.app" });

const socketHandler = (req, res) => {
  try {
    console.log("calledapi");
    if (res.socket.server.io) {
      console.log("socket already running");
    } else {
      console.log("created new socket");
      const io = new Server(res.socket.server);
      console.log("Socket created");
      res.socket.server.io = io;
      io.on("connection", (socket) => {
        console.log("server is connected");
        socket.on("join-room", (roomId, userId) => {
          console.log("joinn room event is triggred on api");
          console.log(`A new user ${userId} joined room ${roomId}`);
          socket.join(roomId);
          // socket.broadcast.to(roomId).emit("user-connected", userId);
          socket.broadcast.to(roomId).emit("user-connected", userId);
        });
        socket.on("user-toggle-audio", (userId, roomId) => {
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
        });
        socket.on("user-toggle-video", (userId, roomId) => {
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-toggle-video", userId);
        });
        socket.on("user-leave", (userId, roomId) => {
          socket.join(roomId);
          socket.broadcast.to(roomId).emit("user-leave", userId);
        });
      });
    }
    res.end();
  } catch (error) {
    console.log("error in socket api==>", error);
  }
};

export default socketHandler;
