import { defaultPlayer } from "../data/defaultPlayer"

let player = defaultPlayer

export function getPlayer() {
  const savedPlayer = localStorage.getItem("mac2_player")

  if (savedPlayer) {
    player = JSON.parse(savedPlayer)
  }

  return player
}

export function updatePlayer(updater: (player: any) => any) {
  player = updater(player)
  localStorage.setItem("mac2_player", JSON.stringify(player))
  return player
}