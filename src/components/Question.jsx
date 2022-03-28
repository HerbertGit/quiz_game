import React from "react";
import Answer from "./Answer";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";
import { render } from "@testing-library/react";

function shuffle(array) {
  if (!array) return;

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default function Question(props) {
  /*
    Push all wrong answers as <Answer/> componets in to array
    Adding corect answer also as <Answer/> componets 
    Shuffling array using  Durstenfeld's shuffle algorithm
  */

  const [selectedAnswer, setSelectedAnswer] = useState("");
  // const [correctAnswer, setCorrectAnswer] = useState(props.correct);

  let answersList;
  let decodedQuestion = "";

  function handleSelect(answerID) {
    setSelectedAnswer(answerID);
  }

  /*correct | selected / endGame     "" | selected | correct | false
      0         0           0         1
    /  0         1           0                 1
      1         0           0         1  
      0         1           1                                     1
      1         0           1                           1
      1         1           1                           1
 */

  //   }
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    let shuffledAnswers = shuffle(props.answers);
    setAnswers(shuffledAnswers);
  }, []);

  decodedQuestion = he.decode(props.text);
  answersList = answers.map((answer) => {
    return (
      <div
        key={answer}
        className={`button question__answer ${
          answer === props.correct && props.end ? "correct" : ""
        } ${selectedAnswer === answer && !props.end ? "selected" : ""}  ${
          props.end && answer !== props.correct && selectedAnswer === answer
            ? "wrong"
            : ""
        }`}
        onClick={() => handleSelect(answer)}
      >
        {answer}
      </div>
    );
  });

  console.log(selectedAnswer);

  return (
    <div className="question">
      <p className="question__text">{decodedQuestion}</p>
      <div className="question__answer-wrapper">{answersList}</div>
    </div>
  );
}
