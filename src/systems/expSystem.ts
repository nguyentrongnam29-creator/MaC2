import { updatePlayer } from "./playerSystem"

export function gainExp(amount: number) {
  return updatePlayer((player) => ({
    ...player,
    exp: player.exp + amount,
  }))
}