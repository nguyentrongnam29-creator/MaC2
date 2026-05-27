import { gainExp } from "./expSystem"
import { checkLevelUp } from "./levelSystem"

import { getPlayer } from "./playerSystem"

export function handleCorrectAnswer() {
  const player = getPlayer()

  const newStreak =
    player.streak + 1

  let expGain = 10

if (player.streak >= 5) {
  expGain += 10
}

if (player.streak >= 5) {
  expGain += 10
}

  if (newStreak >= 3) {
    expGain = 20
  } else if (newStreak >= 2) {
    expGain = 15
  }

  gainExp(expGain)

  const updatedPlayer =
    checkLevelUp()

  updatedPlayer.streak =
    newStreak

  return {
    ...updatedPlayer,
    gainedExp: expGain,
  }
}

export function handleWrongAnswer() {
  const player = getPlayer()

  player.streak = 0

  return player
}