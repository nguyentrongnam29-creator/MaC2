interface QuizPanelProps {
  question: string
  answers: string[]
  locked: boolean
  onSelectAnswer: (answer: string) => void
}

export function QuizPanel({ question, answers, locked, onSelectAnswer }: QuizPanelProps) {
  return (
    <section className="panel">
      <h2>Quiz</h2>
      <p className="question">{question}</p>
      <div className="answers">
        {answers.map((answer) => (
          <button key={answer} disabled={locked} onClick={() => onSelectAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </section>
  )
}
