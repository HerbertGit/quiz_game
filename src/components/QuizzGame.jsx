import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";
import data from "../data";
import { nanoid } from "nanoid";

export default function QuizzGame() {
  const [questions, setQuestions] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [checkAnswers, setChceckAnswers] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(data);
  }, []);

  console.log(questions);

  function handleScore() {
    setScore((prevScore) => prevScore + 1);
  }

  let questionElements = [];
  questionElements =
    questions !== []
      ? questions.map((question, i) => {
          let answers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          console.log(answers);
          return (
            <Question
              text={question.question}
              correct={question.correct_answer}
              end={endGame}
              check={checkAnswers}
              answers={answers}
              key={question.question}
              handleScore={handleScore}
            />
          );
        })
      : [];

  function turnEndGame() {
    console.log("toggling end game");
    setChceckAnswers((prevCheck) => !prevCheck);
    setEndGame((prevEndGame) => !prevEndGame);
    console.log(score);
    setChceckAnswers((prevCheck) => !prevCheck);
  }

  console.log(score);

  return (
    <div className="quizz-game">
      {questionElements}
      <button className="button quizz-game__button" onClick={turnEndGame}>
        Check Answers
      </button>
    </div>
  );
}
