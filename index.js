"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const node_http_1 = __importDefault(require("node:http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000; // Use environment variable for flexibility
// Assuming you have your frontend files in a directory named 'public'
app.use(express_1.default.static('public'));
const server = node_http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Replace with allowed origins for production
    },
});
io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('message', (msg) => {
        io.to(msg.room).emit('messageResponse', msg); // Broadcast message to all connected clients
    });
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
    });
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
