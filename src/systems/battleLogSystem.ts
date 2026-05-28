import type { BattleLogEntry } from "../types/game"

export function createLogEntry(
  text: string,
  type: BattleLogEntry["type"],
): BattleLogEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    type,
  }
}

export function pushBattleLog(
  logs: BattleLogEntry[],
  entry: BattleLogEntry,
  maxEntries = 40,
): BattleLogEntry[] {
  return [entry, ...logs].slice(0, maxEntries)
}
