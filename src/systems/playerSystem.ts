import { defaultPlayer } from "../data/defaultPlayer"
import { loadPlayer, savePlayer } from "../storage/playerStorage"
import type { PlayerState } from "../types/game"

let player: PlayerState = { ...defaultPlayer }

export function getPlayer(): PlayerState {
  player = loadPlayer()
  return player
}

export function setPlayer(nextPlayer: PlayerState): PlayerState {
  player = nextPlayer
  savePlayer(player)
  return player
}

export function updatePlayer(
  updater: (currentPlayer: PlayerState) => PlayerState,
): PlayerState {
  player = updater(player)
  savePlayer(player)
  return player
}