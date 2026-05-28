import vocab from "../data/vocab/A1.json"

let lastQuestion = ""

export function getRandomQuestion() {
  let randomQuestion

  do {
    const randomIndex = Math.floor(Math.random() * vocab.length)
    randomQuestion = vocab[randomIndex]
  } while (randomQuestion.chinese === lastQuestion)

  lastQuestion = randomQuestion.chinese

  return randomQuestion
}

export function checkAnswer(selected: string, correct: string) {
  return selected === correct
}