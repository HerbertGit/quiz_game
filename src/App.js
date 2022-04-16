import "./App.css";
import { useState, useEffect, useContext } from "react";
import QuizzGame from "./Views/QuizzGame";
import HomeScreen from "./Views/HomeScreen";
import { PreferencesContext } from "./utils/Context";
import { CATEGORY } from "./utils/constants";

function App() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const { preferences } = useContext(PreferencesContext);
  /*
  - Fetch data from API ( 5 questions)
    -Collect user preferences about question ( dificulty and category)
    -Save them to state
    -Parse custom URL to fetch request
    -Make fetch request
  - Store data in to App state
    - userPreferences is object
    - {
        difficulties: value
        categories: value
      }
  - Pass question to QuizGame Component
  - When game ends remove questions from App state
  - If there is no more questions in App state fetch them again
  */

  function apiCall(cat, diff) {
    const url = `https://opentdb.com/api.php?amount=5${
      cat === 0 ? "" : `&category=${cat}`
    }${diff === "Any Difficulty" ? "" : `$category=${diff.toLowerCase()}`}`;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
        console.log(data.results);
      });

    console.log(`questions@App: ${questions}`);
  }

  useEffect(() => {
    apiCall(preferences.category, preferences.difficulty);
  }, []);

  useEffect(() => {
    apiCall(preferences.category, preferences.difficulty);
  }, [preferences]);

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
        <QuizzGame
          incrementScore={addScore}
          backToMainMenu={toggleGame}
          newQuestions={questions}
        />
      ) : (
        <HomeScreen score={gameScore} toggleGame={toggleGame} />
      )}
    </div>
  );
}

export default App;
