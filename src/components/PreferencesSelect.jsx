import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { category, difficulty } from "../utils/catergories";
import { PreferencesContext } from "../utils/Context";
import { DIFFICULTY, CATEGORY } from "../utils/constants";

export default function PreferencesSelect({ type }) {
  const { preferences, updatePreferences } = useContext(PreferencesContext);
  const [selection, setSelection] = useState(
    type === DIFFICULTY ? preferences[DIFFICULTY] : preferences[CATEGORY]
  );

  let optionsList;

  function handleChange(e) {
    console.log(e.target.value);
    setSelection(() => e.target.value);
    updatePreferences(type, e.target.value);
  }

  if (type === CATEGORY) {
    optionsList = category.map((option) => {
      return <option value={option.id}> {option.name}</option>;
    });
  } else if (type === DIFFICULTY) {
    optionsList = difficulty.map((option) => {
      return <option value={option}> {option}</option>;
    });
  }

  return (
    <select onChange={handleChange} value={selection} name={type} id={type}>
      {optionsList}
    </select>
  );
}

PreferencesSelect.propTypes = {
  type: PropTypes.oneOf([CATEGORY, DIFFICULTY]),
};
