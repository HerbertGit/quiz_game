import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";
import data from "../data";
import { nanoid } from "nanoid";

export default function QuizzGame() {
  const [questions, setQuestions] = useState(data);

  const questionList = questions.map((question) => {
    return <Question data={question} key={nanoid()} />;
  });

  return <div className="quizz-game">{questionList}</div>;
}
