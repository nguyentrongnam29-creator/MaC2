interface ActionButtonsProps {
  onMeditate: () => void
  onBreakthrough: () => void
  onResetSave: () => void
  breakthroughDisabled: boolean
}

export function ActionButtons({
  onMeditate,
  onBreakthrough,
  onResetSave,
  breakthroughDisabled,
}: ActionButtonsProps) {
  return (
    <section className="panel actions">
      <h2>Actions</h2>
      <button onClick={onMeditate}>Meditate</button>
      <button onClick={onBreakthrough} disabled={breakthroughDisabled}>
        Breakthrough
      </button>
      <button className="danger" onClick={onResetSave}>
        Reset Save
      </button>
    </section>
  )
}
