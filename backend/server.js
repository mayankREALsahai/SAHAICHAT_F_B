const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  // Frontend origin
        methods: ["GET", "POST"]
    }
});

// Rooms and message handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a room
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
        socket.to(room).emit("message", `User ${socket.id} joined the room`);
    });

    // Handle sending messages
    socket.on("message", ({ room, message }) => {
        io.to(room).emit("message", message);  // Broadcast message within the room
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
