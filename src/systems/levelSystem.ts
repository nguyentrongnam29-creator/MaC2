import { updatePlayer } from "./playerSystem"
import { getRequiredExp } from "../utils/expFormula"

export function checkLevelUp() {
  return updatePlayer((player) => {
    let updatedPlayer = { ...player }

    while (
      updatedPlayer.exp >=
      getRequiredExp(updatedPlayer.level)
    ) {
      updatedPlayer.exp -= getRequiredExp(
        updatedPlayer.level
      )

      updatedPlayer.level += 1

      updatedPlayer.stats.hp += 20
      updatedPlayer.stats.mana += 15
      updatedPlayer.stats.atk += 5
      updatedPlayer.stats.defense += 2

      updatedPlayer.maxExp =
        getRequiredExp(updatedPlayer.level)
    }

    return updatedPlayer
  })
}