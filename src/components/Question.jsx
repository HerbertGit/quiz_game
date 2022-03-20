import React from "react";
import Answer from "./Answer";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";
import { render } from "@testing-library/react";

export default function Question(props) {
  /*
    Push all wrong answers as <Answer/> componets in to array
    Adding corect answer also as <Answer/> componets 
    Shuffling array using  Durstenfeld's shuffle algorithm
  */
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerList, setAnswerList] = useState([]);
  const [answerComponentList, setAnswerComponentList] = useState([]);

  function renderAnswers() {
    console.log("Answer list: " + answerList);
    let ComponentList = answerList.map((answer) => {
      return (
        <Answer
          value={answer.value}
          correct={answer.correct}
          key={answer.id}
          id={answer.id}
          selected={answer.selected}
          handleClick={() => handleSelect(answer.id)}
        />
      );
    });

    setAnswerComponentList(ComponentList);
  }

  function handleSelect(answerID) {
    // console.log(answerID);
    setSelectedAnswer(answerID);
    setAnswerList((prevAnswerList) => {
      return prevAnswerList.map((prevAnswer) => {
        return {
          ...prevAnswer,
          selected: answerID === prevAnswer.id ? !prevAnswer.selected : false,
        };
      });
    });
  }

  //Only on First Run
  useEffect(() => {
    let answerObjects = [];

    const answerOptions = [
      ...props.data.incorrect_answers,
      props.data.correct_answer,
    ];

    answerObjects = answerOptions.map((answer) => {
      let answerID = nanoid();

      return {
        value: answer,
        correct: false,
        id: answerID,
        selected: false,
      };
    });

    if (!answerList) {
      for (let i = answerObjects.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = answerObjects[i];
        answerObjects[i] = answerObjects[j];
        answerObjects[j] = temp;
      }
    }

    setAnswerList(answerObjects);
    renderAnswers();
  }, []);

  useEffect(() => {
    renderAnswers();
  }, [answerList]);

  let decodedQuestion = he.decode(props.data.question);
  function checkAnswers() {
    /*
      map through answerList
      if answerList.value === props.data.correct_answer
        change that answer "correct" tag to true
        
    */
  }

  if (props.endGame) {
    checkAnswers();
  }

  return (
    <div className="question">
      <p className="question__text">{decodedQuestion}</p>
      <div className="question__answer-wrapper">{answerComponentList}</div>
    </div>
  );
}
