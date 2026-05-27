import { defaultPlayer } from "../data/defaultPlayer"

const PLAYER_STORAGE_KEY = "mac2_player"

export function savePlayer(player: any) {
  localStorage.setItem(
    PLAYER_STORAGE_KEY,
    JSON.stringify(player)
  )
}

export function loadPlayer() {
  const savedPlayer = localStorage.getItem(
    PLAYER_STORAGE_KEY
  )

  if (!savedPlayer) {
    return defaultPlayer
  }

  return JSON.parse(savedPlayer)
}

export function resetPlayer() {
  localStorage.removeItem(
    PLAYER_STORAGE_KEY
  )

  return defaultPlayer
}

