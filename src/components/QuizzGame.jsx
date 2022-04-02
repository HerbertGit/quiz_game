import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";
import data from "../data";

export default function QuizzGame() {
  const [questions, setQuestions] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [checkAnswers, setChceckAnswers] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(data);
  }, []);

  // console.log(questions);

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
          // console.log(answers);
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
    // setChceckAnswers((prevCheck) => !prevCheck);
  }

  useEffect(() => {
    console.log(score);
  }, [score]);

  // console.log(score);

  /*
  <30% => red  <2 { 0 , 1 , 2}
  <70% => yellow < 4 { 3 , 4}
  <100% => green < 5 { 5}


 */

  function scoreColor(score, maxScore) {
    const colorStep = 255 / maxScore;
    let red = 255;
    let green = 0;

    red = red - colorStep * score;
    green = green + colorStep * score;

    console.log(`score color: rgb(${red},${green},0) `);
    return `rgb(${red},${green}, 100)`;
  }

  return (
    <div className="quizz-game">
      {questionElements}
      {endGame && (
        <h3
          style={{ color: scoreColor(score, 5) }}
        >{`The Score is: ${score}/5`}</h3>
      )}
      <button className="button quizz-game__button" onClick={turnEndGame}>
        Check Answers
      </button>
    </div>
  );
}
