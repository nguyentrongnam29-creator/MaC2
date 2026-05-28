import { defaultPlayer } from "../data/defaultPlayer"
import type { PlayerState } from "../types/game"

const PLAYER_STORAGE_KEY = "mac2_player"

function normalizePlayer(rawPlayer: Partial<PlayerState> | null): PlayerState {
  if (!rawPlayer) return { ...defaultPlayer }
  return {
    ...defaultPlayer,
    ...rawPlayer,
    realm: {
      ...defaultPlayer.realm,
      ...rawPlayer.realm,
    },
    stats: {
      ...defaultPlayer.stats,
      ...rawPlayer.stats,
    },
    spiritRoot: {
      ...defaultPlayer.spiritRoot,
      ...rawPlayer.spiritRoot,
      statBonus: {
        ...defaultPlayer.spiritRoot.statBonus,
        ...rawPlayer.spiritRoot?.statBonus,
      },
    },
    cooldowns: {
      ...defaultPlayer.cooldowns,
      ...rawPlayer.cooldowns,
    },
  }
}

export function savePlayer(player: PlayerState): void {
  try {
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player))
  } catch {
    // ignore quota/storage errors to avoid breaking gameplay
  }
}

export function loadPlayer(): PlayerState {
  const savedPlayer = localStorage.getItem(PLAYER_STORAGE_KEY)

  if (!savedPlayer) {
    return { ...defaultPlayer }
  }

  try {
    const parsed = JSON.parse(savedPlayer) as Partial<PlayerState>
    return normalizePlayer(parsed)
  } catch {
    localStorage.removeItem(PLAYER_STORAGE_KEY)
    return { ...defaultPlayer }
  }
}

export function resetPlayer(): PlayerState {
  localStorage.removeItem(PLAYER_STORAGE_KEY)

  return { ...defaultPlayer }
}