import { useState } from "react"

function App() {
  const [question, setQuestion] = useState("愛")

  const answers = ["yêu", "ăn", "uống", "ngủ"]

  function handleAnswer(answer: string) {
    alert(`Bạn chọn: ${answer}`)
    setQuestion(question === "愛" ? "吃" : "愛")
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>MaC2 Test</h1>

      <h2>{question}</h2>

      <div>
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => handleAnswer(answer)}
            style={{
              display: "block",
              marginBottom: 12,
              padding: 12,
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