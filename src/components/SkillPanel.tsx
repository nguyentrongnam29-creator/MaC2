import type { SkillDefinition, SkillId } from "../types/game"

interface SkillPanelProps {
  skills: SkillDefinition[]
  lockedReasonBySkill: Record<string, string | undefined>
  onUseSkill: (skillId: SkillId) => void
}

export function SkillPanel({ skills, lockedReasonBySkill, onUseSkill }: SkillPanelProps) {
  return (
    <section className="panel">
      <h2>Skills</h2>
      <div className="skills">
        {skills.map((skill) => {
          const reason = lockedReasonBySkill[skill.id]
          return (
            <button key={skill.id} disabled={Boolean(reason)} onClick={() => onUseSkill(skill.id)}>
              {skill.name} ({skill.manaCost} mana)
              <small>{reason ?? `CD ${skill.cooldown}`}</small>
            </button>
          )
        })}
      </div>
    </section>
  )
}
