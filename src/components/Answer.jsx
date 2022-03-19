import React from "react";

export default function Answer(props) {
  return (
    <div
      className={`button question__answer${props.correct ? "--correct" : ""} ${
        props.selected ? "question__answer--selected" : ""
      }`}
      onClick={props.handleClick}
    >
      {props.value}
    </div>
  );
}
