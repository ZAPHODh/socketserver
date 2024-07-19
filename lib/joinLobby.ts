import LobbyModel from '../models/lobby'
import Player from '../models/player'

export const joinLobby = async (lobbyId: string, playerData: Player) => {
    try {
        const newPlayer = Player.create(playerData)

        await LobbyModel.updateOne(
            { lobbyId },
            { $push: { players: newPlayer } }
        )
    } catch (error) {
        throw error
    }
}
