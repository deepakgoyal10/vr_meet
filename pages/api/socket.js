import { Server } from "socket.io";
const socketHandler = (req, res) => {
  try {
    console.log("calledapi");
    if (res.socket.server.io) {
      console.log("socket already running");
    } else {
      const io = new Server(res.socket.server);
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
      });
    }
    res.end();
  } catch (error) {
    console.log("error in socket api==>", error);
  }
};

export default socketHandler;
