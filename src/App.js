import "./App.css";
import { useState } from "react";
import QuizzGame from "./components/QuizzGame";

function App() {
  const [game, setGame] = useState({ win: false, start: false });

  function toggleGame() {
    // console.log("state changed " + game.start);
    setGame((prevGame) => {
      return {
        ...prevGame,
        start: !prevGame.start,
      };
    });
  }

  //Renders QuizzGame component if user starts
  return (
    <div className="app">
      {game.start ? (
        <QuizzGame />
      ) : (
        <section className="welcome-screen">
          <h1>Quizz App</h1>
          <p className="welcome-screen__text">Some description if needed</p>
          <button
            className="button welcome-screen__button"
            onClick={toggleGame}
          >
            Start Game
          </button>
        </section>
      )}
    </div>
  );
}

export default App;
