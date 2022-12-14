import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";
import "../styles/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    setName("");
  }

  return (
    <div className="searchBar">
      <input
        className="input"
        type="text"
        value={name}
        placeholder="Buscando receta..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" className="btn" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
