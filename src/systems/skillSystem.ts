import { realmConfigs } from "../data/realms"
import { skills } from "../data/skills"
import type { PlayerState, SkillDefinition, SkillId } from "../types/game"

function getRealmIndex(realmName: PlayerState["realm"]["current"]): number {
  return realmConfigs.findIndex((item) => item.name === realmName)
}

export function getSkillList(): SkillDefinition[] {
  return skills
}

export function isSkillUnlocked(player: PlayerState, skill: SkillDefinition): boolean {
  const playerRealmIndex = getRealmIndex(player.realm.current)
  const skillRealmIndex = getRealmIndex(skill.unlockRealm)
  return player.level >= skill.unlockLevel && playerRealmIndex >= skillRealmIndex
}

export function canUseSkill(
  player: PlayerState,
  skillId: SkillId,
): {
  ok: boolean
  reason?: string
  skill?: SkillDefinition
} {
  const skill = skills.find((item) => item.id === skillId)
  if (!skill) return { ok: false, reason: "Skill khong ton tai." }
  if (!isSkillUnlocked(player, skill)) return { ok: false, reason: "Skill chua mo khoa." }
  if (player.currentMana < skill.manaCost) return { ok: false, reason: "Khong du mana." }
  const currentCooldown = player.cooldowns[skillId] ?? 0
  if (currentCooldown > 0) return { ok: false, reason: `Con ${currentCooldown} luot hoi.` }
  return { ok: true, skill }
}

export function applySkillCost(player: PlayerState, skill: SkillDefinition): PlayerState {
  return {
    ...player,
    currentMana: Math.max(0, player.currentMana - skill.manaCost),
    cooldowns: {
      ...player.cooldowns,
      [skill.id]: skill.cooldown,
    },
    damageReductionTurns: skill.damageReduction ? 2 : player.damageReductionTurns,
  }
}

export function tickCooldowns(player: PlayerState): PlayerState {
  const nextCooldowns: PlayerState["cooldowns"] = {}
  for (const [skillId, value] of Object.entries(player.cooldowns)) {
    nextCooldowns[skillId] = Math.max(0, value - 1)
  }
  return {
    ...player,
    cooldowns: nextCooldowns,
    damageReductionTurns: Math.max(0, player.damageReductionTurns - 1),
  }
}
