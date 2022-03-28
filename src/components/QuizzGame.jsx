import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";
import data from "../data";
import { nanoid } from "nanoid";

export default function QuizzGame() {
  const [questions, setQuestions] = useState([]);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    setQuestions(data);
  }, []);

  console.log(questions);

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
              answers={answers}
              key={question.question}
            />
          );
        })
      : [];

  function turnEndGame() {
    console.log("toggling end game");
    setEndGame((prevEndGame) => !prevEndGame);
  }
  return (
    <div className="quizz-game">
      {questionElements}
      <button className="button quizz-game__button" onClick={turnEndGame}>
        Check Answers
      </button>
    </div>
  );
}
