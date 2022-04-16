import React from "react";
import { useEffect, useState } from "react";
import he from "he";

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

export default function Question({
  text,
  correct,
  end,
  check,
  answers,
  handleScore,
}) {
  /*
    Push all wrong answers as <Answer/> componets in to array
    Adding corect answer also as <Answer/> componets 
    Shuffling array using  Durstenfeld's shuffle algorithm
  */

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionAnswers, setAnswers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [reShuffle, toggleReShuffle] = useState(true);

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
  useEffect(() => {
    if (reShuffle) {
      let shuffledAnswers = shuffle(answers);

      setAnswers(shuffledAnswers);
      toggleReShuffle(false);
    }
  }, [answers, reShuffle]);

  decodedQuestion = he.decode(text);
  answersList = questionAnswers.map((answer) => {
    return (
      <div
        key={answer}
        className={`button question__answer ${
          answer === correct && end ? "correct" : ""
        } ${selectedAnswer === answer && !end ? "selected" : ""}  ${
          end && answer !== correct && selectedAnswer === answer ? "wrong" : ""
        }`}
        onClick={() => handleSelect(answer)}
      >
        {he.decode(answer)}
      </div>
    );
  });

  if (check && !checked && selectedAnswer === correct) {
    console.log(`Question ${text} is correct`);
    handleScore();
    setChecked(true);
  }

  // console.log(selectedAnswer);

  return (
    <div className="question">
      <p className="question__text">{decodedQuestion}</p>
      <div className="question__answer-wrapper">{answersList}</div>
    </div>
  );
}
