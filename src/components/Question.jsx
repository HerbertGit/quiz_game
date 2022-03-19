import React from "react";
import Answer from "./Answer";

export default function Question() {
  const answerList = [];
  for (let i = 0; i < 4; i++) {
    answerList.push(<Answer value={props.data.incorrect_answers[i]} />);
  }
  answerList.push(props.data.correct_answer);

  return (
    <div className="question">
      <p className="question__text">{props.data.question}</p>
      <div className="question__answer-wrapper">{answerList}</div>
    </div>
  );
}
