import type { PlayerState } from "../types/game"

export const defaultPlayer: PlayerState = {
  username: "Cultivator",
  level: 1,
  exp: 0,
  maxExp: 100,
  realm: {
    current: "Pham Nhan",
    cultivation: 0,
  },
  stats: {
    hp: 100,
    mana: 50,
    atk: 10,
    defense: 5,
  },
  currentHp: 100,
  currentMana: 50,
  streak: 0,
  gold: 0,
  spiritRoot: {
    type: "Phàm",
    expMultiplier: 1,
    statBonus: {
      hp: 0,
      mana: 0,
      atk: 0,
      defense: 0,
    },
  },
  cooldowns: {},
  damageReductionTurns: 0,
}