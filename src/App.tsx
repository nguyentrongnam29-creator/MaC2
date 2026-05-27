import { useState } from "react"

import { getPlayer } from "./systems/playerSystem"
import { handleCorrectAnswer } from "./systems/gameEngine"

import {
  getRandomQuestion,
  checkAnswer,
} from "./systems/quizSystem"

function App() {
  const [player, setPlayer] = useState(
    getPlayer()
  )

  const [levelUpMessage, setLevelUpMessage] =
    useState("")

  const [answerMessage, setAnswerMessage] =
    useState("")

  const [question, setQuestion] = useState(
    getRandomQuestion()
  )

  const expPercent = Math.min(
    (player.exp / player.maxExp) * 100,
    100
  )

  const answers = [
    "yêu",
    "ăn",
    "uống",
    "ngủ",
  ]

  function handleAnswer(selected: string) {
    const isCorrect = checkAnswer(
      selected,
      question.vietnamese
    )

    if (isCorrect) {
      setAnswerMessage(
        "✔ Chính xác!"
      )

      const oldLevel = player.level

      const updatedPlayer =
        handleCorrectAnswer()

      setPlayer({ ...updatedPlayer })

      if (
        updatedPlayer.level > oldLevel
      ) {
        setLevelUpMessage(
          `⚡ Đột phá Lv ${updatedPlayer.level}!`
        )

        setTimeout(() => {
          setLevelUpMessage("")
        }, 2000)
      }
    } else {
      setAnswerMessage(
        "❌ Sai rồi!"
      )
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
        background:
          "linear-gradient(180deg, #090014, #050510)",
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
        {player.realm.major}
        {" "}
        -
        {" "}
        {player.realm.minor}
      </h2>

      <p>Level: {player.level}</p>

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
            background:
              "linear-gradient(90deg, #7c3aed, #38bdf8)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p>
        EXP:
        {" "}
        {player.exp}
        /
        {player.maxExp}
      </p>

      <hr
        style={{
          margin: "30px 0",
          borderColor: "#333",
        }}
      />

      <h2>
        {question.chinese}
      </h2>

      {answerMessage && (
        <p
          style={{
            color:
              answerMessage.includes("✔")
                ? "#4ade80"
                : "#f87171",

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
            onClick={() =>
              handleAnswer(answer)
            }
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
