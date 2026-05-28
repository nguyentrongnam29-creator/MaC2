import vocab from "../data/vocab/A1.json"
import { shuffleArray } from "../utils/shuffle"
import type { VocabQuestion } from "../types/game"

let lastQuestion = ""

export interface QuizRound {
  question: VocabQuestion
  answers: string[]
}

export function getRandomQuestion(): VocabQuestion {
  let randomQuestion

  do {
    const randomIndex = Math.floor(Math.random() * vocab.length)
    randomQuestion = vocab[randomIndex] as VocabQuestion
  } while (randomQuestion.chinese === lastQuestion)

  lastQuestion = randomQuestion.chinese

  return randomQuestion
}

export function createQuizRound(): QuizRound {
  const question = getRandomQuestion()
  const wrongAnswers = shuffleArray(
    (vocab as VocabQuestion[])
      .filter((item) => item.vietnamese !== question.vietnamese)
      .map((item) => item.vietnamese),
  )

  const uniqueWrongAnswers = Array.from(new Set(wrongAnswers)).slice(0, 3)
  const answers = shuffleArray([question.vietnamese, ...uniqueWrongAnswers])

  return { question, answers }
}

export function checkAnswer(selected: string, correct: string): boolean {
  return selected === correct
}