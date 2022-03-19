import React from "react";
import Answer from "./Answer";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import he from "he";

export default function Question(props) {
  /*
    Push all wrong answers as <Answer/> componets in to array
    Adding corect answer also as <Answer/> componets 
    Shuffling array using  Durstenfeld's shuffle algorithm
  */
  let answerList = [];

  for (let i = 0; i < 3; i++) {
    answerList.push(
      <Answer
        value={props.data.incorrect_answers[i]}
        correct={false}
        key={nanoid()}
      />
    );
  }
  answerList.push(
    <Answer value={props.data.correct_answer} correct={true} key={nanoid()} />
  );

  console.log(answerList);

  for (let i = answerList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = answerList[i];
    answerList[i] = answerList[j];
    answerList[j] = temp;
  }

  let decodedQuestion = he.decode(props.data.question);
  console.log(decodedQuestion);

  return (
    <div className="question">
      <p className="question__text">{decodedQuestion}</p>
      <div className="question__answer-wrapper">{answerList}</div>
    </div>
  );
}
