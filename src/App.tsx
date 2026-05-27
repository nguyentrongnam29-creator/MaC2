import { useState } from "react"

import { getPlayer } from "./systems/playerSystem"

import {
  handleCorrectAnswer,
  handleWrongAnswer,
} from "./systems/gameEngine"

import {
  getRandomQuestion,
  checkAnswer,
} from "./systems/quizSystem"

import { shuffleArray } from "./utils/shuffle"
import { enemies } from "./data/enemies"

function App() {
  const [player, setPlayer] = useState(getPlayer())
  const [playerHp, setPlayerHp] = useState(player.stats.hp)
  const [playerMana, setPlayerMana] = useState(player.stats.mana)

  const [levelUpMessage, setLevelUpMessage] = useState("")
  const [answerMessage, setAnswerMessage] = useState("")
  const [question, setQuestion] = useState(getRandomQuestion())

  const [currentEnemy, setCurrentEnemy] = useState(enemies[0])
  const [enemyHp, setEnemyHp] = useState(enemies[0].maxHp)

  const expPercent = Math.min((player.exp / player.maxExp) * 100, 100)

  const answers = shuffleArray([
    question.vietnamese,
    "ăn",
    "uống",
    "ngủ",
  ])

  function spawnRandomEnemy() {
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
    setCurrentEnemy(randomEnemy)
    setEnemyHp(randomEnemy.maxHp)
  }

  function handleAnswer(selected: string) {
    const isCorrect = checkAnswer(selected, question.vietnamese)

    if (isCorrect) {
      const damage = 25
      const newHp = Math.max(enemyHp - damage, 0)
      const oldLevel = player.level
      const updatedPlayer = handleCorrectAnswer()
      const expGain = updatedPlayer.gainedExp

      if (newHp <= 0) {
        setAnswerMessage(`💀 Đã tiêu diệt ${currentEnemy.name}! +${expGain} EXP`)
        spawnRandomEnemy()
      } else {
        setEnemyHp(newHp)
        setAnswerMessage(`✔ Chính xác! +${expGain} EXP`)
      }

      setPlayer({ ...updatedPlayer })

      if (updatedPlayer.level > oldLevel) {
        setLevelUpMessage(`⚡ Đột phá Lv ${updatedPlayer.level}!`)
        setTimeout(() => setLevelUpMessage(""), 2000)
      }
    } else {
      const updatedPlayer = handleWrongAnswer()
      const enemyDamage = currentEnemy.damage
      const newPlayerHp = Math.max(playerHp - enemyDamage, 0)

      setPlayer({ ...updatedPlayer })

      if (newPlayerHp <= 0) {
        setAnswerMessage("☠️ Ngươi đã trọng thương!")
        setPlayerHp(updatedPlayer.stats.hp)
      } else {
        setPlayerHp(newPlayerHp)
        setAnswerMessage(`❌ Sai rồi! -${enemyDamage} HP`)
      }
    }

    setTimeout(() => setAnswerMessage(""), 1400)
    setQuestion(getRandomQuestion())
  }

  function handleSkillAttack() {
    if (playerMana < 20) {
      setAnswerMessage("❌ Không đủ linh khí!")
      return
    }

    const damage = 60
    const newHp = Math.max(enemyHp - damage, 0)

    setPlayerMana(playerMana - 20)

    if (newHp <= 0) {
      setAnswerMessage(`💥 Pháp thuật tiêu diệt ${currentEnemy.name}!`)
      spawnRandomEnemy()
    } else {
      setEnemyHp(newHp)
      setAnswerMessage("💥 Thi triển pháp thuật!")
    }

    setTimeout(() => setAnswerMessage(""), 1200)
  }

  function handleMeditation() {
    setPlayerHp(Math.min(playerHp + 30, player.stats.hp))
    setPlayerMana(Math.min(playerMana + 20, player.stats.mana))
    setAnswerMessage("🧘 Thiền định hồi phục 30 HP và 20 linh khí")
    setTimeout(() => setAnswerMessage(""), 1200)
  }

  return (
    <div
      style={{
        padding: "24px",
        color: "white",
        background: "linear-gradient(180deg, #090014, #050510)",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h1>MaC2</h1>

      <h2>
        {player.realm.major} - {player.realm.minor}
      </h2>

      <p>Level: {player.level}</p>

      <p>
        HP: {playerHp} / {player.stats.hp}
      </p>

      <div
        style={{
          maxWidth: "420px",
          height: "18px",
          background: "#222",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(playerHp / player.stats.hp) * 100}%`,
            height: "100%",
            background: "#22c55e",
          }}
        />
      </div>

      <p>
        Mana: {playerMana} / {player.stats.mana}
      </p>

      <div
        style={{
          maxWidth: "420px",
          height: "18px",
          background: "#222",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(playerMana / player.stats.mana) * 100}%`,
            height: "100%",
            background: "#3b82f6",
          }}
        />
      </div>

      <p>Streak: {player.streak}</p>

      <div
        style={{
          maxWidth: "420px",
          height: "22px",
          background: "#222",
          borderRadius: "999px",
          overflow: "hidden",
          border: "1px solid #6d28d9",
        }}
      >
        <div
          style={{
            width: `${expPercent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #7c3aed, #38bdf8)",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "28px",
          padding: "18px",
          maxWidth: "420px",
          border: "1px solid #7c3aed",
          borderRadius: "18px",
          background: "#120a24",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "32px",
            margin: "0 0 8px",
          }}
        >
          🐺 {currentEnemy.name}
        </h2>

        <p
          style={{
            color: currentEnemy.color,
            fontWeight: "bold",
          }}
        >
          {currentEnemy.realm}
        </p>

        <p>
          Enemy HP: {enemyHp} / {currentEnemy.maxHp}
        </p>

        <div
          style={{
            height: "18px",
            background: "#222",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(enemyHp / currentEnemy.maxHp) * 100}%`,
              height: "100%",
              background: "#ef4444",
            }}
          />
        </div>
      </div>

      <p style={{ marginTop: "18px", fontSize: "20px" }}>
        EXP: {player.exp} / {player.maxExp}
      </p>

      <hr style={{ margin: "30px 0", borderColor: "#333" }} />

      <div
        style={{
          marginBottom: "16px",
          padding: "20px",
          maxWidth: "420px",
          border: "1px solid #38bdf8",
          borderRadius: "18px",
          background: "#06111f",
          textAlign: "center",
        }}
      >
        <p>Từ vựng:</p>

        <h1
          style={{
            fontSize: "64px",
            color: "#38bdf8",
            margin: 0,
          }}
        >
          {question.chinese}
        </h1>
      </div>

      {answerMessage && (
        <p
          style={{
            color:
              answerMessage.includes("❌") ||
              answerMessage.includes("☠️")
                ? "#f87171"
                : "#4ade80",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {answerMessage}
        </p>
      )}

      <button
        onClick={handleSkillAttack}
        style={{
          padding: "12px",
          marginBottom: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        💥 Pháp Thuật (-20 Mana)
      </button>

      <br />

      <button
        onClick={handleMeditation}
        style={{
          padding: "12px",
          marginBottom: "20px",
          background: "#0f766e",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        🧘 Thiền Định
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "420px",
        }}
      >
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            style={{
              padding: "14px",
              background: "#1e1b4b",
              color: "white",
              border: "1px solid #7c3aed",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App