import mongoose from 'mongoose'

const PlayerSchema: mongoose.Schema<Player> = new mongoose.Schema({
    lobbyId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
})

const PlayerModel = mongoose.model<Player>('Player', PlayerSchema)

export default PlayerModel
