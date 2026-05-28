import { enemies } from "../data/enemies"
import { realmConfigs } from "../data/realms"
import type { EnemyState, PlayerState, RealmName } from "../types/game"

function getRealmMultiplier(realmName: RealmName): number {
  return realmConfigs.find((realm) => realm.name === realmName)?.statMultiplier ?? 1
}

export function spawnEnemy(player: PlayerState): EnemyState {
  const available = enemies.filter((enemy) => enemy.minLevel <= player.level + 2)
  const pool = available.length > 0 ? available : [enemies[0]]
  const template = pool[Math.floor(Math.random() * pool.length)]
  const levelFactor = 1 + player.level * 0.12
  const realmFactor = getRealmMultiplier(player.realm.current)
  const maxHp = Math.floor(template.baseHp * levelFactor * (0.9 + realmFactor * 0.15))
  const damage = Math.floor(template.baseDamage * levelFactor * (0.85 + realmFactor * 0.12))

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: template.name,
    realm: player.realm.current,
    maxHp,
    currentHp: maxHp,
    damage,
    color: template.color,
    level: Math.max(1, Math.floor(player.level * (0.9 + Math.random() * 0.25))),
  }
}
