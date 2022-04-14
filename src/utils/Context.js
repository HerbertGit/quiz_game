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

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
      }}
    >
      {props.children}
    </PreferencesContext.Provider>
  );
};

export { ContextProvider, PreferencesContext };
