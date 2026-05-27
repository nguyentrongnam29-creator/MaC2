export function getRequiredExp(
  level: number
) {
  return Math.floor(
    50 * Math.pow(level, 1.5)
  )
}