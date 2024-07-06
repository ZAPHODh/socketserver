// Import necessary modules
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    socket.on('message', (msg: string) => {
        io.emit('messageResponse', msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
