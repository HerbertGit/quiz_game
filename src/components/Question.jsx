import React from "react";
import Answer from "./Answer";

export default function Question() {
  const answerList = [];
  for (let i = 0; i < 4; i++) {
    answerList.push(<Answer value={`Answer ${i}`} />);
  }

  return (
    <div className="question">
      <p className="question__text">Question</p>
      <div className="question__answer-wrapper">{answerList}</div>
    </div>
  );
}
