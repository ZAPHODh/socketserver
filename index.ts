import { Server } from 'socket.io'
import http from 'node:http'
import express from 'express'
const app = express()
const port = process.env.PORT || 4000 // Use environment variable for flexibility

// Assuming you have your frontend files in a directory named 'public'
app.use(express.static('public'))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*', // Replace with allowed origins for production
    },
})

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log('Received message:', msg)
        io.emit('messageResponse', msg) // Broadcast message to all connected clients
    })

    socket.on('disconnect', () => {})
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
