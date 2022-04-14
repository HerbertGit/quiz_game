import React from "react";

export default function HomeScreen({ score, toggleGame }) {
  return (
    <section className="welcome-screen">
      <h1>Quizz App</h1>
      <h3>{`Your Current Score is ${score}`}</h3>
      <p className="welcome-screen__text">Some description if needed</p>
      <button className="button welcome-screen__button" onClick={toggleGame}>
        Start Game
      </button>
    </section>
  );
}
