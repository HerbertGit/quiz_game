import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";
import data from "../data";
import { nanoid } from "nanoid";

export default function QuizzGame() {
  const [questions, setQuestions] = useState(data);
  const [endGame, setEndGame] = useState(false);

  function turnEndGame() {
    setEndGame((prevEndGame) => !prevEndGame);
  }

  const questionList = questions.map((question) => {
    return <Question data={question} endGame={endGame} key={nanoid()} />;
  });

  return (
    <div className="quizz-game">
      {questionList}
      <button className="button quizz-game__button" onClick={turnEndGame}>
        Check Answers
      </button>
    </div>
  );
}
