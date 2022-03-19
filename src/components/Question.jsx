import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  const answerList = [];
  for (let i = 0; i < 3; i++) {
    answerList.push(
      <Answer value={props.data.incorrect_answers[i]} correct={false} />
    );
  }
  answerList.push(<Answer value={props.data.correct_answer} correct={true} />);

  return (
    <div className="question">
      <p className="question__text">{props.data.question}</p>
      <div className="question__answer-wrapper">{answerList}</div>
    </div>
  );
}
