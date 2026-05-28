import { useEffect, useMemo, useState } from "react"
import "./App.css"
import { ActionButtons } from "./components/ActionButtons"
import { BattleLog } from "./components/BattleLog"
import { EnemyPanel } from "./components/EnemyPanel"
import { PlayerPanel } from "./components/PlayerPanel"
import { QuizPanel } from "./components/QuizPanel"
import { SkillPanel } from "./components/SkillPanel"
import { getSkillList, canUseSkill, applySkillCost, tickCooldowns } from "./systems/skillSystem"
import { checkAnswer, createQuizRound } from "./systems/quizSystem"
import { calculateRewards, enemyAttack, isDead, playerAttack } from "./systems/combatSystem"
import { canBreakthrough, applyBreakthrough } from "./systems/realmSystem"
import { createLogEntry, pushBattleLog } from "./systems/battleLogSystem"
import { spawnEnemy } from "./systems/enemySystem"
import { checkLevelUp } from "./systems/levelSystem"
import { gainExp } from "./systems/expSystem"
import { loadPlayer, resetPlayer, savePlayer } from "./storage/playerStorage"
import { setPlayer } from "./systems/playerSystem"
import type { BattleLogEntry, EnemyState, PlayerState, SkillId } from "./types/game"

function App() {
  const [player, setLocalPlayer] = useState<PlayerState>(() => loadPlayer())
  const [enemy, setEnemy] = useState<EnemyState>(() => spawnEnemy(loadPlayer()))
  const [quizRound, setQuizRound] = useState(createQuizRound)
  const [logs, setLogs] = useState<BattleLogEntry[]>([
    createLogEntry("Tran dau bat dau.", "system"),
  ])
  const [answerLocked, setAnswerLocked] = useState(false)
  const [pendingSkill, setPendingSkill] = useState<SkillId | null>(null)

  const skillList = getSkillList()

  useEffect(() => {
    setPlayer(player)
    savePlayer(player)
  }, [player])

  const log = (text: string, type: BattleLogEntry["type"]) => {
    setLogs((prev) => pushBattleLog(prev, createLogEntry(text, type)))
  }

  const handleEnemyDeath = (nextPlayer: PlayerState) => {
    const rewards = calculateRewards(enemy)
    gainExp(rewards.exp)
    const levelResult = checkLevelUp()
    const rewardedPlayer: PlayerState = {
      ...levelResult.player,
      gold: levelResult.player.gold + rewards.gold,
      realm: {
        ...levelResult.player.realm,
        cultivation: levelResult.player.realm.cultivation + rewards.cultivation,
      },
    }
    setLocalPlayer(rewardedPlayer)
    log(`Ha guc ${enemy.name}. +${rewards.exp} EXP, +${rewards.cultivation} cultivation`, "enemy_death")
    if (levelResult.levelUps > 0) {
      log(`Level up x${levelResult.levelUps}`, "level_up")
    }
    setEnemy(spawnEnemy(rewardedPlayer))
  }

  const handleCombatTurn = (selectedAnswer: string) => {
    if (answerLocked) return
    setAnswerLocked(true)
    const correct = checkAnswer(selectedAnswer, quizRound.question.vietnamese)

    if (correct) {
      const skillCheck = pendingSkill ? canUseSkill(player, pendingSkill) : { ok: true }
      let nextPlayer = tickCooldowns(player)
      let nextEnemy = enemy

      if (pendingSkill && !skillCheck.ok) {
        log(skillCheck.reason ?? "Khong the dung skill", "system")
        setPendingSkill(null)
      }

      if (pendingSkill && skillCheck.ok && skillCheck.skill) {
        nextPlayer = applySkillCost(nextPlayer, skillCheck.skill)
        const hit = playerAttack(nextPlayer, enemy, skillCheck.skill)
        nextEnemy = hit.enemy
        if (hit.damage.isDodged) log("Dich ne don skill.", "dodge")
        else log(`Skill gay ${hit.damage.amount} sat thuong`, hit.damage.isCrit ? "crit" : "damage")
      } else if (!pendingSkill) {
        const hit = playerAttack(nextPlayer, enemy)
        nextEnemy = hit.enemy
        if (hit.damage.isDodged) log("Dich ne don tan cong.", "dodge")
        else log(`Tan cong thuong gay ${hit.damage.amount} sat thuong`, hit.damage.isCrit ? "crit" : "damage")
      } else {
        setLocalPlayer(nextPlayer)
        setPendingSkill(null)
        return
      }

      if (isDead(nextEnemy.currentHp)) {
        handleEnemyDeath(nextPlayer)
      } else {
        const enemyHit = enemyAttack(nextPlayer, nextEnemy)
        nextPlayer = enemyHit.player
        if (enemyHit.damage.isDodged) log("Ban ne duoc don tan cong cua dich.", "dodge")
        else log(`Nhan ${enemyHit.damage.amount} sat thuong`, "damage")
        setLocalPlayer(nextPlayer)
        setEnemy(nextEnemy)
      }
      setPendingSkill(null)
    } else {
      const enemyHit = enemyAttack(tickCooldowns(player), enemy)
      setLocalPlayer({
        ...enemyHit.player,
        streak: 0,
      })
      if (enemyHit.damage.isDodged) log("Sai dap an, nhung ban may man ne don.", "dodge")
      else log(`Sai dap an. Mat ${enemyHit.damage.amount} HP`, "damage")
    }

    setTimeout(() => {
      setQuizRound(createQuizRound())
      setAnswerLocked(false)
    }, 800)
  }

  const handleMeditate = () => {
    const manaGain = Math.max(10, Math.floor(player.stats.mana * 0.2))
    const hpGain = Math.max(12, Math.floor(player.stats.hp * 0.15))
    setLocalPlayer((prev) => ({
      ...prev,
      currentMana: Math.min(prev.stats.mana, prev.currentMana + manaGain),
      currentHp: Math.min(prev.stats.hp, prev.currentHp + hpGain),
      realm: {
        ...prev.realm,
        cultivation: prev.realm.cultivation + 20,
      },
    }))
    log("Meditation hoi phuc va tang cultivation.", "meditation")
  }

  const handleBreakthrough = () => {
    const validation = canBreakthrough(player)
    if (!validation.allowed) {
      log(validation.reason ?? "Khong the dot pha.", "system")
      return
    }
    const next = applyBreakthrough(player)
    setLocalPlayer(next)
    log(`Dot pha thanh cong: ${next.realm.current}`, "breakthrough")
  }

  const handleUseSkill = (skillId: SkillId) => {
    const result = canUseSkill(player, skillId)
    if (!result.ok) {
      log(result.reason ?? "Khong the dung skill.", "system")
      return
    }
    setPendingSkill(skillId)
    log("Skill da duoc kich hoat. Tra loi dung de xuat chieu.", "system")
  }

  const handleResetSave = () => {
    const reset = resetPlayer()
    setLocalPlayer(reset)
    setEnemy(spawnEnemy(reset))
    setQuizRound(createQuizRound())
    setPendingSkill(null)
    setAnswerLocked(false)
    setLogs([createLogEntry("Da reset save game.", "system")])
  }

  const enemyHpPercent = useMemo(() => (enemy.currentHp / enemy.maxHp) * 100, [enemy])
  const hpPercent = useMemo(() => (player.currentHp / player.stats.hp) * 100, [player])
  const manaPercent = useMemo(() => (player.currentMana / player.stats.mana) * 100, [player])
  const expPercent = useMemo(() => (player.exp / player.maxExp) * 100, [player])

  const lockReasonBySkill = useMemo(
    () =>
      skillList.reduce<Record<string, string | undefined>>((acc, skill) => {
        const test = canUseSkill(player, skill.id)
        acc[skill.id] = test.ok ? undefined : test.reason
        return acc
      }, {}),
    [player, skillList],
  )

  return (
    <main className="game-shell">
      <h1>MaC2 - Cultivation RPG</h1>
      <div className="grid-top">
        <PlayerPanel player={player} expPercent={expPercent} hpPercent={hpPercent} manaPercent={manaPercent} />
        <EnemyPanel enemy={enemy} hpPercent={enemyHpPercent} />
      </div>
      <div className="grid-mid">
        <QuizPanel
          question={quizRound.question.chinese}
          answers={quizRound.answers}
          locked={answerLocked}
          onSelectAnswer={handleCombatTurn}
        />
        <SkillPanel skills={skillList} lockedReasonBySkill={lockReasonBySkill} onUseSkill={handleUseSkill} />
        <ActionButtons
          onMeditate={handleMeditate}
          onBreakthrough={handleBreakthrough}
          onResetSave={handleResetSave}
          breakthroughDisabled={!canBreakthrough(player).allowed}
        />
      </div>
      <BattleLog logs={logs} />
    </main>
  )
}

export default App