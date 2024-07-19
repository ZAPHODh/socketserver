"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const node_http_1 = __importDefault(require("node:http"));
const express_1 = __importDefault(require("express"));
const getRandomImage_1 = require("./lib/getRandomImage");
const images_1 = require("./lib/images");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const server = node_http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('startGame', (gameSetting) => {
        const selectedImage = (0, getRandomImage_1.getRandomImage)(images_1.images);
        io.to(gameSetting.room).emit('startGameResponse', selectedImage);
    });
    socket.on('guessed', (guessedSettings) => {
    });
    socket.on('message', (msg) => {
        io.to(msg.room).emit('messageResponse', msg);
    });
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
    });
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
