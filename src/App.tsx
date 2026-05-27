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
  const [levelUpMessage, setLevelUpMessage] = useState("")
  const [answerMessage, setAnswerMessage] = useState("")
  const [question, setQuestion] = useState(getRandomQuestion())
  const [currentEnemy, setCurrentEnemy] = useState(enemies[0])
  const [enemyHp, setEnemyHp] = useState(enemies[0].maxHp)

  const expPercent = Math.min(
    (player.exp / player.maxExp) * 100,
    100
  )

  const answers = shuffleArray(["yêu", "ăn", "uống", "ngủ"])

  function handleAnswer(selected: string) {
    const isCorrect = checkAnswer(selected, question.vietnamese)

    if (isCorrect) {
      const damage = 25
      const newHp = Math.max(enemyHp - damage, 0)

      const oldLevel = player.level
      const updatedPlayer = handleCorrectAnswer()
      const expGain = updatedPlayer.gainedExp

      if (newHp <= 0) {
        const randomEnemy =
          enemies[Math.floor(Math.random() * enemies.length)]

        setCurrentEnemy(randomEnemy)
        setEnemyHp(randomEnemy.maxHp)

        setAnswerMessage(
          `💀 Đã tiêu diệt ${currentEnemy.name}! +${expGain} EXP`
        )
      } else {
        setEnemyHp(newHp)
        setAnswerMessage(`✔ Chính xác! +${expGain} EXP`)
      }

      setPlayer({ ...updatedPlayer })

      if (updatedPlayer.level > oldLevel) {
        setLevelUpMessage(`⚡ Đột phá Lv ${updatedPlayer.level}!`)

        setTimeout(() => {
          setLevelUpMessage("")
        }, 2000)
      }
    } else {
      const updatedPlayer = handleWrongAnswer()

      setPlayer({ ...updatedPlayer })
      setAnswerMessage("❌ Sai rồi!")
    }

    setTimeout(() => {
      setAnswerMessage("")
    }, 1200)

    setQuestion(getRandomQuestion())
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

      {levelUpMessage && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#7c3aed",
            borderRadius: "12px",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 0 20px #7c3aed",
          }}
        >
          {levelUpMessage}
        </div>
      )}

      <h2>
        {player.realm.major} - {player.realm.minor}
      </h2>

      <p>Level: {player.level}</p>

      <p>Streak: {player.streak}</p>

      <div
        style={{
          width: "100%",
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
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <h2>🐺 {currentEnemy.name}</h2>

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
          width: "100%",
          maxWidth: "420px",
          height: "18px",
          background: "#222",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${(enemyHp / currentEnemy.maxHp) * 100}%`,
            height: "100%",
            background: "#ef4444",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p>
        EXP: {player.exp} / {player.maxExp}
      </p>

      <hr
        style={{
          margin: "30px 0",
          borderColor: "#333",
        }}
      />

      <h2>{question.chinese}</h2>

      {answerMessage && (
        <p
          style={{
            color: answerMessage.includes("❌") ? "#f87171" : "#4ade80",
            fontWeight: "bold",
          }}
        >
          {answerMessage}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "300px",
        }}
      >
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            style={{
              padding: "12px",
              background: "#1e1b4b",
              color: "white",
              border: "1px solid #7c3aed",
              borderRadius: "10px",
              cursor: "pointer",
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