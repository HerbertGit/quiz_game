import PreferencesSelect from "../components/PreferencesSelect";
import { PreferencesContext } from "../utils/Context";
import { useContext } from "react";
import { DIFFICULTY, CATEGORY } from "../utils/constants";

/*
    -Two Select elements
        -one for dificulty and one for category
    -When value changes they are changin value of
        userPreferences stateObject in App component
*/

export default function HomeScreen({
  score,
  toggleGame,
  updatePreferences,
  pending,
}) {
  const { preferences, points } = useContext(PreferencesContext);

  // console.log(`preferences@HomeScren : ${preferences[DIFFICULTY]}`);

  return (
    <section className="welcome-screen">
      <h1>Quizz App</h1>
      <h3>{`Your Current Score is ${points.globalPoints}`}</h3>
      <p className="welcome-screen__text">Some description if needed</p>
      {`Difficulty: ${preferences[DIFFICULTY]} Category: ${preferences[CATEGORY]}`}
      <PreferencesSelect
        type={CATEGORY}
        updatePreferences={updatePreferences}
      />
      <PreferencesSelect
        type={DIFFICULTY}
        updatePreferences={updatePreferences}
      />

      {pending ? (
        <button className="button welcome-screen__button" disabled>
          Loading...
        </button>
      ) : (
        <button className="button welcome-screen__button" onClick={toggleGame}>
          Start Game
        </button>
      )}
    </section>
  );
}
