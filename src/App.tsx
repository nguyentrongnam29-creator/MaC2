import { useState } from "react"

import { getPlayer } from "./systems/playerSystem"
import { handleCorrectAnswer } from "./systems/gameEngine"

function App() {
  const [player, setPlayer] = useState(getPlayer())
  const [levelUpMessage, setLevelUpMessage] = useState("")

  const expPercent = Math.min(
    (player.exp / player.maxExp) * 100,
    100
  )

  function handleTrain() {
    const oldLevel = player.level
    const updatedPlayer = handleCorrectAnswer()

    setPlayer({ ...updatedPlayer })

    if (updatedPlayer.level > oldLevel) {
      setLevelUpMessage(`⚡ Đột phá Lv ${updatedPlayer.level}!`)

      setTimeout(() => {
        setLevelUpMessage("")
      }, 2000)
    }
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

      <p>
        EXP: {player.exp} / {player.maxExp}
      </p>

      <p>HP: {player.stats.hp}</p>
      <p>Mana: {player.stats.mana}</p>
      <p>ATK: {player.stats.atk}</p>
      <p>DEF: {player.stats.defense}</p>

      <button
        onClick={handleTrain}
        style={{
          padding: "14px 28px",
          marginTop: "20px",
          cursor: "pointer",
          background: "#6d28d9",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          boxShadow: "0 0 20px #6d28d9",
        }}
      >
        Train (+10 EXP)
      </button>
    </div>
  )
}

export default App