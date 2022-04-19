import React, { useContext } from "react";
import { useState } from "react";
import Question from "../components/Question";
import { scoreColor } from "../utils/utils_functions";
import { PreferencesContext } from "../utils/Context";

export default function QuizzGame({
  incrementScore,
  backToMainMenu,
  newQuestions,
}) {
  // const [questions, setQuestions] = useState(newQuestions);
  const [endGame, setEndGame] = useState(false);
  const [checkAnswers, setChceckAnswers] = useState(false);
  // const [points, setScore] = useState(0);
  const { points } = useContext(PreferencesContext);

  // console.log(`QUIZZ QUESTIONS: ${newQuestions}`);

  // useEffect(() => {
  //   // console.log(points);
  //   //Adding points to global score
  //   incrementScore(points);
  // }, [points, incrementScore]);

  let questionElements = [];
  questionElements =
    newQuestions !== []
      ? newQuestions.map((question, i) => {
          let answers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          return (
            <Question
              text={question.question}
              correct={question.correct_answer}
              end={endGame}
              check={checkAnswers}
              answers={answers}
              key={question.question}
              // handleScore={handleScore}
            />
          );
        })
      : [];

  function turnEndGame() {
    console.log("toggling end game");
    setChceckAnswers((prevCheck) => !prevCheck);
    setEndGame((prevEndGame) => !prevEndGame);
    console.log(points);
    // setChceckAnswers((prevCheck) => !prevCheck);
  }

  return (
    <div className="quizz-game">
      {questionElements}
      {endGame && (
        <h3
          style={{ color: scoreColor(points, 5) }}
        >{`The Score is: ${points.localPoints}/5`}</h3>
      )}

      {endGame === true ? (
        <button className="button quizz-game__button" onClick={backToMainMenu}>
          Back To Main Menu
        </button>
      ) : (
        <button className="button quizz-game__button" onClick={turnEndGame}>
          Check Answers
        </button>
      )}
    </div>
  );
}
