import mongoose from 'mongoose'

const LobbySchema: mongoose.Schema<Lobby> = new mongoose.Schema({
    lobbyId: {
        type: String,
        required: true,
    },
    currentRound: {
        type: Number,
        required: true,
    },
    guesses: {
        type: Number,
    },
    maxPlayers: {
        type: Number,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    maxRounds: {
        type: Number,
        required: true,
    },
    players: [],
})

const LobbyModel = mongoose.model<Lobby>('Lobby', LobbySchema)

export default LobbyModel
