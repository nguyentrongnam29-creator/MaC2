import type { PlayerState } from "../types/game"

interface PlayerPanelProps {
  player: PlayerState
  expPercent: number
  hpPercent: number
  manaPercent: number
}

export function PlayerPanel({ player, expPercent, hpPercent, manaPercent }: PlayerPanelProps) {
  return (
    <section className="panel">
      <h2>{player.username}</h2>
      <p className="subtle">
        Realm: {player.realm.current} | Level: {player.level}
      </p>
      <p className="subtle">Cultivation: {player.realm.cultivation}</p>
      <div className="bar-wrap">
        <span>HP</span>
        <div className="bar">
          <div className="bar-fill hp" style={{ width: `${hpPercent}%` }} />
        </div>
        <small>
          {player.currentHp}/{player.stats.hp}
        </small>
      </div>
      <div className="bar-wrap">
        <span>Mana</span>
        <div className="bar">
          <div className="bar-fill mana" style={{ width: `${manaPercent}%` }} />
        </div>
        <small>
          {player.currentMana}/{player.stats.mana}
        </small>
      </div>
      <div className="bar-wrap">
        <span>EXP</span>
        <div className="bar">
          <div className="bar-fill exp" style={{ width: `${expPercent}%` }} />
        </div>
        <small>
          {Math.floor(player.exp)}/{player.maxExp}
        </small>
      </div>
      <p className="subtle">
        ATK {player.stats.atk} | DEF {player.stats.defense} | Gold {player.gold}
      </p>
    </section>
  )
}
