import Lobby from '../models/lobby'

export const newLobby = async ({
    lobbyId,
    maxPlayers,
    maxRounds,
    ownerId,
}: LobbyData) => {
    Lobby.create({ lobbyId, maxPlayers, maxRounds, ownerId, currentRound: 0 })
}
