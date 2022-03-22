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

  useEffect(() => {
    const answerOptions = [
      ...props.data.incorrect_answers,
      props.data.correct_answer,
    ];

    let answerObjects = answerOptions.map((answer) => {
      let answerID = nanoid();
      let cor = undefined;
      if (props.endGame) {
        if (answer === props.data.correct_answer) {
          cor = true;
        } else if (answer !== props.data.correct_answer) {
          cor = false;
        }
      }

      return {
        value: answer,
        correct: cor,
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
  }, []);

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

  let decodedQuestion = he.decode(props.data.question);

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
  // useEffect(() => {

  // renderAnswers();
  // }, []);

  // rerenders answers when data
  // useEffect(() => {
  //   console.log("rerender");
  //   renderAnswers();
  // }, [answerList]);

  // function checkAnswers() {
  //   console.log("checking answers");
  //   /*
  //     map through answerList
  //     if answerList.value === props.data.correct_answer && answerList.selected
  //       change that answer "correct" value to true
  //     else if answerList.selected && answer

  //     selected | answer is true | color    |  style
  //         1             1         green       --correct
  //         1             0         red         --wrong
  //         0             1         green       --correct
  //         0             0         default

  //   */

  //   //Changes
  //   setAnswerList((prevAnswerList) => {
  //     // console.log(prevAnswerList);
  //     return prevAnswerList.map((prevAnswer) => {
  //       return {
  //         ...prevAnswer,
  //         correct:
  //           prevAnswer.value === props.data.correct_answer ? true : false,
  //       };
  //     });
  //   });
  //   console.log("changed answer list: " + answerList);
  // }
  //
  // if (props.endGame) {
  //   checkAnswers();
  // }

  // useEffect(() => {
  //   console.log("checking if game has ended");
  //   if (props.endGame) checkAnswers();
  // }, [props.endGame]);

  return (
    <div className="question">
      <p className="question__text">{decodedQuestion}</p>
      <div className="question__answer-wrapper">{ComponentList}</div>
    </div>
  );
}
