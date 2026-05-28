import type { EnemyState } from "../types/game"

interface EnemyPanelProps {
  enemy: EnemyState
  hpPercent: number
}

export function EnemyPanel({ enemy, hpPercent }: EnemyPanelProps) {
  return (
    <section className="panel enemy-panel" style={{ borderColor: enemy.color }}>
      <h2>{enemy.name}</h2>
      <p className="subtle">
        Realm: {enemy.realm} | Lv {enemy.level}
      </p>
      <div className="bar-wrap">
        <span>Enemy HP</span>
        <div className="bar">
          <div className="bar-fill enemy" style={{ width: `${hpPercent}%`, background: enemy.color }} />
        </div>
        <small>
          {enemy.currentHp}/{enemy.maxHp}
        </small>
      </div>
      <p className="subtle">Damage: {enemy.damage}</p>
    </section>
  )
}
