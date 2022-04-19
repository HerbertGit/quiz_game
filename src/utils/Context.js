//
import { createContext, useState } from "react";

const PreferencesContext = createContext({
  difficulty: "Any difficulty",
  category: 0,
});

const ContextProvider = (props) => {
  const [preferences, setPreferences] = useState({
    difficulty: "Any Difficulty",
    category: 0,
  });
  const [points, setPoints] = useState({
    localPoints: 0,
    globalPoints: 0,
  });

  function updatePreferences(type, value) {
    console.log(`type: ${type} value: ${value}`);
    setPreferences((prevPreferences) => {
      const newPref = {
        ...prevPreferences,
        [type]: value,
      };

      console.log(`newPref@Context : ${newPref[type]}`);
      return newPref;
    });
  }

  function addLocalPoint() {
    setPoints((prevPoints) => {
      return {
        ...prevPoints,
        localPoints: prevPoints.localPoints + 1,
      };
    });
  }

  function addLocalToGlobalPoints() {
    setPoints(({ globalPoints, localPoints }) => {
      return {
        globalPoints: globalPoints + localPoints,
        localPoints: 0,
      };
    });
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        points,
        addLocalToGlobalPoints,
        addLocalPoint,
      }}
    >
      {props.children}
    </PreferencesContext.Provider>
  );
};

export { ContextProvider, PreferencesContext };
