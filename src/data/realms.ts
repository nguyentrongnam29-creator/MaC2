import type { RealmConfig } from "../types/game"

export const realmConfigs: RealmConfig[] = [
  { name: "Pham Nhan", requiredLevel: 1, requiredCultivation: 0, statMultiplier: 1 },
  { name: "Luyen Khi", requiredLevel: 3, requiredCultivation: 80, statMultiplier: 1.15 },
  { name: "Truc Co", requiredLevel: 6, requiredCultivation: 180, statMultiplier: 1.3 },
  { name: "Kim Dan", requiredLevel: 10, requiredCultivation: 320, statMultiplier: 1.5 },
  { name: "Nguyen Anh", requiredLevel: 15, requiredCultivation: 520, statMultiplier: 1.75 },
  { name: "Hoa Than", requiredLevel: 22, requiredCultivation: 800, statMultiplier: 2.1 },
]
