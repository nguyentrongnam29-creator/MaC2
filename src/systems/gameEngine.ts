import { gainExp } from "./expSystem"
import { checkLevelUp } from "./levelSystem"
import { getPlayer, updatePlayer } from "./playerSystem"
import type { PlayerState } from "../types/game"

export function handleCorrectAnswer() {
  const player = getPlayer()
  const newStreak = player.streak + 1

  let expGain = 10

  if (newStreak >= 3) {
    expGain = 20
  } else if (newStreak >= 2) {
    expGain = 15
  }

  gainExp(expGain)

  const levelResult = checkLevelUp()

  const updatedPlayer = updatePlayer((currentPlayer) => ({
    ...levelResult.player,
    streak: newStreak,
    realm: {
      ...currentPlayer.realm,
      cultivation: currentPlayer.realm.cultivation + Math.floor(expGain * 0.8),
    },
  }))

  return {
    ...updatedPlayer,
    gainedExp: expGain,
    levelUps: levelResult.levelUps,
  }
}

export function handleWrongAnswer() {
  return updatePlayer((currentPlayer: PlayerState) => ({
    ...currentPlayer,
    streak: 0,
  }))
}