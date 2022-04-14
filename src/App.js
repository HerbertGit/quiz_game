import "./App.css";
import { useState } from "react";
import QuizzGame from "./Views/QuizzGame";
import HomeScreen from "./Views/HomeScreen";

function App() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  function addScore(points) {
    console.log(`Added ${points} points`);
    setGameScore((prevGameScore) => prevGameScore + points);
  }

  function toggleGame() {
    setGameIsRunning((prevGame) => !prevGame);
  }

  //Renders QuizzGame component if user starts
  return (
    <div className="app">
      {gameIsRunning ? (
        <QuizzGame incrementScore={addScore} backToMainMenu={toggleGame} />
      ) : (
        <HomeScreen score={gameScore} toggleGame={toggleGame} />
      )}
    </div>
  );
}

export default App;
