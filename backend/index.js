
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//  Store canvas state per room
const roomCanvasStates = {};

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(` ${socket.id} joined room: ${roomId}`);

    //  Send existing room canvas (if available)
    if (roomCanvasStates[roomId]) {
      socket.emit("canvas-data", roomCanvasStates[roomId]);
    }

    //  Register listener per room
    socket.on("canvas-data", (data) => {
      roomCanvasStates[roomId] = data;
      //  Broadcast only inside this room (excluding sender)
      socket.to(roomId).emit("canvas-data", data);
    });

    socket.on("disconnect", () => {
      console.log(` ${socket.id} disconnected from room: ${roomId}`);
    });
  });
});

server.listen(5000, () => {
  console.log(" Server running on http://localhost:5000");
});
