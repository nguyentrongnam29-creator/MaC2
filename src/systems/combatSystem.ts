import type { EnemyState, PlayerState, SkillDefinition } from "../types/game"

export interface DamageResult {
  amount: number
  isCrit: boolean
  isDodged: boolean
}

export function calculateDamage(
  attackerAtk: number,
  defenderDefense: number,
  critChance = 0.16,
  dodgeChance = 0.08,
  multiplier = 1,
): DamageResult {
  const dodged = Math.random() < dodgeChance
  if (dodged) return { amount: 0, isCrit: false, isDodged: true }

  const raw = attackerAtk * multiplier - defenderDefense * 0.35
  const baseDamage = Math.max(1, Math.floor(raw))
  const isCrit = Math.random() < critChance
  const critMultiplier = isCrit ? 1.8 : 1

  return {
    amount: Math.max(1, Math.floor(baseDamage * critMultiplier)),
    isCrit,
    isDodged: false,
  }
}

export function enemyAttack(player: PlayerState, enemy: EnemyState): {
  player: PlayerState
  damage: DamageResult
} {
  const dodgeChance = Math.min(0.3, player.stats.defense / 500)
  const reduction = player.damageReductionTurns > 0 ? 0.6 : 1
  const hit = calculateDamage(enemy.damage, player.stats.defense, 0.12, dodgeChance, reduction)
  return {
    player: {
      ...player,
      currentHp: Math.max(0, player.currentHp - hit.amount),
    },
    damage: hit,
  }
}

export function playerAttack(
  player: PlayerState,
  enemy: EnemyState,
  skill?: SkillDefinition,
): {
  enemy: EnemyState
  damage: DamageResult
} {
  const multiplier = skill?.damageMultiplier ?? 1
  const dodgeChance = Math.min(0.22, enemy.level * 0.01)
  const hit = calculateDamage(player.stats.atk, enemy.damage * 0.15, 0.2, dodgeChance, multiplier)
  return {
    enemy: {
      ...enemy,
      currentHp: Math.max(0, enemy.currentHp - hit.amount),
    },
    damage: hit,
  }
}

export function calculateRewards(enemy: EnemyState): {
  exp: number
  gold: number
  cultivation: number
} {
  return {
    exp: Math.floor(enemy.maxHp * 0.32 + enemy.level * 6),
    gold: Math.floor(enemy.level * 5 + enemy.maxHp * 0.08),
    cultivation: Math.floor(enemy.level * 10 + enemy.maxHp * 0.22),
  }
}

export function isDead(targetHp: number): boolean {
  return targetHp <= 0
}
