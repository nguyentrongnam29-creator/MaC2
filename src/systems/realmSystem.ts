import { realmConfigs } from "../data/realms"
import type { PlayerState, RealmName } from "../types/game"

export function getRealmLabel(realm: RealmName): string {
  const labels: Record<RealmName, string> = {
    "Pham Nhan": "Pham Nhan",
    "Luyen Khi": "Luyen Khi",
    "Truc Co": "Truc Co",
    "Kim Dan": "Kim Dan",
    "Nguyen Anh": "Nguyen Anh",
    "Hoa Than": "Hoa Than",
  }
  return labels[realm]
}

export function canBreakthrough(player: PlayerState): {
  allowed: boolean
  reason?: string
} {
  const currentIndex = realmConfigs.findIndex((item) => item.name === player.realm.current)
  const next = realmConfigs[currentIndex + 1]

  if (!next) return { allowed: false, reason: "Da dat canh gioi toi da." }
  if (player.level < next.requiredLevel) {
    return { allowed: false, reason: `Can dat level ${next.requiredLevel}.` }
  }
  if (player.realm.cultivation < next.requiredCultivation) {
    return { allowed: false, reason: `Can ${next.requiredCultivation} cultivation.` }
  }
  return { allowed: true }
}

export function applyBreakthrough(player: PlayerState): PlayerState {
  const currentIndex = realmConfigs.findIndex((item) => item.name === player.realm.current)
  const next = realmConfigs[currentIndex + 1]
  if (!next) return player

  const hpBonus = Math.floor(player.stats.hp * 0.18)
  const manaBonus = Math.floor(player.stats.mana * 0.2)
  const atkBonus = Math.floor(player.stats.atk * 0.15)
  const defBonus = Math.floor(player.stats.defense * 0.15)

  return {
    ...player,
    realm: {
      ...player.realm,
      current: next.name,
      cultivation: player.realm.cultivation - next.requiredCultivation,
    },
    stats: {
      hp: player.stats.hp + hpBonus,
      mana: player.stats.mana + manaBonus,
      atk: player.stats.atk + atkBonus,
      defense: player.stats.defense + defBonus,
    },
    currentHp: player.stats.hp + hpBonus,
    currentMana: player.stats.mana + manaBonus,
  }
}
