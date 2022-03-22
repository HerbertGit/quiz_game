import React from "react";

export default function Answer(props) {
  // let style = () =>{
  //   if(props.selected && )
  // }
  let style = "";

  console.log(props);

  if (props.correct === true) {
    style = "question__answer--correct";
  } else if (props.correct === false && props.selected) {
    style = "question__answer--false";
  }

  return (
    <div
      className={`button question__answer ${style} ${
        props.selected ? "question__answer--selected" : ""
      }`}
      onClick={props.handleClick}
    >
      {props.value}
    </div>
  );
}
