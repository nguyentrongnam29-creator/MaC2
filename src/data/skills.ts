import type { SkillDefinition } from "../types/game"

export const skills: SkillDefinition[] = [
  {
    id: "linh_kiem_tram",
    name: "Linh Kiem Tram",
    manaCost: 18,
    cooldown: 2,
    unlockLevel: 2,
    unlockRealm: "Luyen Khi",
    damageMultiplier: 1.5,
  },
  {
    id: "hoa_cau_thuat",
    name: "Hoa Cau Thuat",
    manaCost: 28,
    cooldown: 3,
    unlockLevel: 6,
    unlockRealm: "Truc Co",
    damageMultiplier: 2,
  },
  {
    id: "ho_the_chan_khi",
    name: "Ho The Chan Khi",
    manaCost: 20,
    cooldown: 4,
    unlockLevel: 5,
    unlockRealm: "Luyen Khi",
    damageReduction: 0.4,
  },
]
