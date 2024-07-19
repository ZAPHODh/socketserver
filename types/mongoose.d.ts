interface Lobby extends mongoose.Document {
    lobbyId: string
    ownerId: string
    players: Player[]
    maxPlayers: number
    maxRounds: number
    currentRound: number
    guesses: number
    createdAt: Date
}

interface Player extends mongoose.Document {
    lobbyId: string
    name: string
    score: number
}
