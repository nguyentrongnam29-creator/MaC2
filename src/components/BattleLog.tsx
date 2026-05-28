import type { BattleLogEntry } from "../types/game"

interface BattleLogProps {
  logs: BattleLogEntry[]
}

export function BattleLog({ logs }: BattleLogProps) {
  return (
    <section className="panel battle-log">
      <h2>Battle Log</h2>
      <div className="log-list">
        {logs.map((log) => (
          <p key={log.id} className={`log-${log.type}`}>
            {log.text}
          </p>
        ))}
      </div>
    </section>
  )
}
