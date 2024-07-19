type Room = string

type NewMessage = {
    message: string
    room: Room
    name: string
}

type GameSettings = {
    round: number
    room: string
    players: number
}

type Image = {
    src: string
    photoDate: Date
}

type LobbyData = {
    ownerId: string
    maxPlayers: number
    maxRounds: number
    lobbyId: string
}
type PlayerData = {
    playerId: string
    name: string
    icon: string
    lobbyId: string
}
