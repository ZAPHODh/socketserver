import { Server } from 'socket.io'
import http from 'node:http'
import express from 'express'
const app = express()
const port = process.env.PORT || 4000

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'simple-chat-lovat-xi.vercel.app',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room)
    })
    socket.on('message', (msg) => {
        io.to(msg.room).emit('messageResponse', msg)
    })

    socket.on('leaveRoom', (room) => {
        socket.leave(room)
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
