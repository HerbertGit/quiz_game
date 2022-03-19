import React from "react";
import { useEffect, useState } from "react";
import Question from "./Question";

export default function QuizzGame() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const dummyQuestion = [];
    for (let i = 0; i < 5; i++) {
      dummyQuestion.push(`Question ${i}`);
    }
    setQuestions(dummyQuestion);
  }, []);

  const questionList = questions.map((question) => {
    return <Question />;
  });

  return <div className="quizz-game">{questionList}</div>;
}
