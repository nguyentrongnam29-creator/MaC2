export type RealmName =
  | "Pham Nhan"
  | "Luyen Khi"
  | "Truc Co"
  | "Kim Dan"
  | "Nguyen Anh"
  | "Hoa Than"

export type SkillId =
  | "linh_kiem_tram"
  | "hoa_cau_thuat"
  | "ho_the_chan_khi"

export interface PlayerStats {
  hp: number
  mana: number
  atk: number
  defense: number
}

export interface SpiritRoot {
  type: string
  expMultiplier: number
  statBonus: PlayerStats
}

export interface RealmProgress {
  current: RealmName
  cultivation: number
}

export interface CooldownState {
  [skillId: string]: number
}

export interface PlayerState {
  username: string
  level: number
  exp: number
  maxExp: number
  realm: RealmProgress
  stats: PlayerStats
  currentHp: number
  currentMana: number
  streak: number
  gold: number
  spiritRoot: SpiritRoot
  cooldowns: CooldownState
  damageReductionTurns: number
}

export interface EnemyTemplate {
  name: string
  baseHp: number
  baseDamage: number
  color: string
  minLevel: number
}

export interface EnemyState {
  id: string
  name: string
  realm: RealmName
  maxHp: number
  currentHp: number
  damage: number
  color: string
  level: number
}

export interface RealmConfig {
  name: RealmName
  requiredLevel: number
  requiredCultivation: number
  statMultiplier: number
}

export interface SkillDefinition {
  id: SkillId
  name: string
  manaCost: number
  cooldown: number
  unlockLevel: number
  unlockRealm: RealmName
  damageMultiplier?: number
  damageReduction?: number
}

export interface BattleLogEntry {
  id: string
  text: string
  type:
    | "damage"
    | "crit"
    | "dodge"
    | "level_up"
    | "breakthrough"
    | "enemy_death"
    | "meditation"
    | "system"
}

export interface VocabQuestion {
  chinese: string
  vietnamese: string
}
