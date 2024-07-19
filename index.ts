import { Server } from 'socket.io'
import http from 'node:http'
import express from 'express'
import { newLobby } from './lib/newLobby'
import mongoose from 'mongoose'

import 'dotenv/config'
import { joinLobby } from './lib/joinLobby'

mongoose.connect(process.env.MONGO_CONNECT).catch((err) => {
    console.log(err)
})

const app = express()
const port = process.env.PORT || 4000

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    socket.on('createdLobby', async (lobbyData: LobbyData) => {
        await newLobby(lobbyData)
        socket.emit('lobbyCreated', lobbyData)
    })

    socket.on('joinLobby', (playerData: Player) => {
        socket.join(playerData.lobbyId)
        joinLobby(playerData.lobbyId, playerData)

        io.to(playerData.lobbyId).emit('playerJoined', playerData)
    })

    socket.on('startGame', (data) => {
        const { lobbyId, ownerId } = data
        // Lógica para iniciar o jogo
        startGame(lobbyId, ownerId)
        io.to(lobbyId).emit('gameStarted', { lobbyId })
    })

    socket.on('sendMessage', (data) => {
        const { lobbyId, playerId, message } = data
        io.to(lobbyId).emit('newMessage', { lobbyId, playerId, message })
    })

    socket.on('sendVoiceData', (data) => {
        const { lobbyId, playerId, voiceData } = data
        io.to(lobbyId).emit('voiceData', { lobbyId, playerId, voiceData })
    })

    socket.on('guessYear', (data) => {
        const { lobbyId, playerId, year } = data
        // Lógica para processar a palpite
        processGuess(lobbyId, playerId, year)
    })

    socket.on('toggleVoiceChat', (data) => {
        const { lobbyId, enabled } = data
        io.to(lobbyId).emit('voiceChatToggled', { lobbyId, enabled })
    })

    socket.on('leaveLobby', (data) => {
        const { lobbyId, playerId } = data
        socket.leave(lobbyId)
        io.to(lobbyId).emit('playerLeft', { lobbyId, playerId })
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
