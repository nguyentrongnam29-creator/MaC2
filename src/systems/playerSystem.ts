import { loadPlayer, savePlayer } from "../storage/playerStorage"

let player = loadPlayer()

export function getPlayer() {
  return player
}

export function setPlayer(newPlayer: any) {
  player = newPlayer

  savePlayer(player)
}

export function updatePlayer(
  updater: (player: any) => any
) {
  player = updater(player)

  savePlayer(player)

  return player
}