import "./App.scss";
import { useState, useContext } from "react";
import QuizzGame from "./Views/QuizzGame";
import HomeScreen from "./Views/HomeScreen";
import { PreferencesContext } from "./utils/Context";
// import data from "./data";

function App() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [pending, setPending] = useState(false);
  const { preferences, addLocalToGlobalPoints } =
    useContext(PreferencesContext);

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
    // setQuestions(data);
    // return;

    const url = `https://opentdb.com/api.php?amount=5&type=multiple${
      cat === 0 ? "" : `&category=${cat}`
    }${diff === "Any Difficulty" ? "" : `&difficulty=${diff.toLowerCase()}`}`;
    console.log(url);

    setPending(true);
    console.log("Starting fetching...");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPending(false);
        console.log("Fetch complete...");
        console.log(data);
        setQuestions(data.results);
        return 1;
      })
      .catch((err) => {
        console.error(err);
        return 0;
      });

    // console.log(`questions@App: ${questions}`);
  }

  function addScore(points) {
    console.log(`Added ${points} points`);
    setGameScore((prevGameScore) => prevGameScore + points);
  }

  //toState tells if game should be disabled (false) or enabled (true)
  function toggleGame(toState) {
    if (toState === true) {
      apiCall(preferences.category, preferences.difficulty);
    }
    setGameIsRunning(toState);

    if (toState === false) {
      addLocalToGlobalPoints();
    }
  }

  //Renders QuizzGame component if user starts
  return (
    <div className="app">
      {gameIsRunning && !pending ? (
        <QuizzGame
          incrementScore={addScore}
          backToMainMenu={() => toggleGame(false)}
          newQuestions={questions}
        />
      ) : (
        <HomeScreen
          score={gameScore}
          pending={pending}
          toggleGame={() => toggleGame(true)}
        />
      )}
    </div>
  );
}

export default App;
