import React from "react";

export default function Answer(props) {
  return (
    <div
      className={`button question__answer${props.correct ? "--correct" : ""}`}
    >
      {props.value}
    </div>
  );
}
