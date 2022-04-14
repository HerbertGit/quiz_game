//
import { createContext, useState } from "react";

const PreferencesContext = createContext({
  difficulty: "Any difficulty",
  category: "Any category",
});

const ContextProvider = (props) => {
  const [preferences, setPreferences] = useState({
    difficulty: "Any Difficulty",
    category: "Any category",
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
