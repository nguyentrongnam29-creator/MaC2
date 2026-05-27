import { gainExp } from "./expSystem"
import { checkLevelUp } from "./levelSystem"

export function handleCorrectAnswer() {
  gainExp(10)

  return checkLevelUp()
}