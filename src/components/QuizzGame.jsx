import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";
import data from "../data";

export default function QuizzGame() {
  const [questions, setQuestions] = useState(data);

  // useEffect(() => {
  //   const dummyQuestion = [];
  //   for (let i = 0; i < 5; i++) {
  //     dummyQuestion.push(`Question ${i}`);
  //   }
  //   setQuestions(dummyQuestion);
  // }, []);

  const questionList = questions.map((question) => {
    return <Question data={question} />;
  });

  return <div className="quizz-game">{questionList}</div>;
}
