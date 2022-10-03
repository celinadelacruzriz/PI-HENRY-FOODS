import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../actions";
import "../styles/SearchBar.css";

export default function DeleteBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteRecipe(name));
    setName("");
  }

  return (
    <div className="searchBar">
      <input
        className="input"
        type="text"
        value={name}
        placeholder="Eliminar receta"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" className="btn" onClick={(e) => handleSubmit(e)}>
        Eliminar
      </button>
    </div>
  );
}
