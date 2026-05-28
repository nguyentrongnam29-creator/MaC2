import { updatePlayer } from "./playerSystem"
import { getRequiredExp } from "../utils/expFormula"
import type { PlayerState } from "../types/game"

export function checkLevelUp(): {
  player: PlayerState
  levelUps: number
} {
  let levelUps = 0
  const player = updatePlayer((currentPlayer) => {
    const updatedPlayer = {
      ...currentPlayer,
      stats: { ...currentPlayer.stats },
    }

    while (updatedPlayer.exp >= getRequiredExp(updatedPlayer.level)) {
      updatedPlayer.exp -= getRequiredExp(updatedPlayer.level)
      updatedPlayer.level += 1
      levelUps += 1

      updatedPlayer.stats.hp += 18
      updatedPlayer.stats.mana += 12
      updatedPlayer.stats.atk += 5
      updatedPlayer.stats.defense += 2

      updatedPlayer.currentHp = updatedPlayer.stats.hp
      updatedPlayer.currentMana = updatedPlayer.stats.mana
      updatedPlayer.maxExp = getRequiredExp(updatedPlayer.level)
    }

    return updatedPlayer
  })

  return { player, levelUps }
}