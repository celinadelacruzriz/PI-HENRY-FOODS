import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/RecipeCreate.css";

function validate(input) {
  let errors = {};
  input.title
    ? (errors.title = "")
    : (errors.title = "Debe contener un nombre");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "Debe tener un resumen");
  input.diets.length < 1
    ? (errors.diets = "Elija al menos una dieta")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "Ingrese una URL válida para la imagen";
  } else {
    errors.image = "";
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: 0,
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: [],
  });

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectDiet(e) {
    setInput((input) => ({
      ...input,
      diets: [...input.diets, e.target.value],
    }));
    setErrors(
      validate({
        ...input,
        diets: [...input.diets, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    if (input.title && input.summary && input.image && input.diets.length > 0) {
      e.preventDefault();

      dispatch(postRecipe(input));
      alert("Receta creada con éxito.");
      setInput({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
      });
      history.push("/home");
    } else {
      e.preventDefault();
      alert("Debe completar todos los campos requeridos.");
    }
  }

  function handleDelete(e, d) {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== d),
    });
  }

  return (
    <div className="create">
      <Link to="/home">
        <button className="buttonToHome">VOLVER A HOME</button>
      </Link>
      <h1>Ingrese los datos de su receta aquí:</h1>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre de Plato:</label><br />
            <input
              className="inputCreate"
              placeholder="Completar..."
              type="text"
              value={input.title}
              name="title"
              onChange={(e) => handleChange(e)}
            /><br />
            {errors.title && <p>{errors.title}</p>}
          </div>
          <div>
            <label>Summary:</label><br />
            <input
              className="inputCreate"
              placeholder="Completar..."
              type="text"
              value={input.summary}
              name="summary"
              onChange={(e) => handleChange(e)}
            /><br />
            {errors.summary && <p>{errors.summary}</p>}
          </div>
          <div>
            <label>Score:</label><br />
            <input
              className="inputCreate"
              type="text"
              value={input.aggregateLikes}
              name="aggregateLikes"
              onChange={(e) => handleChange(e)}
            /><br />
          </div>
          <div>
            <label>Health Level:</label><br />
            <input
              className="inputCreate"
              type="text"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
            /><br />
          </div>
          <div>
            <label className="labelInstr">Instrucciones:</label>
            <textarea
              type="text"
              className="instruction"
              placeholder="Completar..."
              rows="5"
              value={input.analyzedInstructions}
              name="analyzedInstructions"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Image:</label><br />
            <input
              className="inputCreate"
              type="text"
              placeholder="Ejemplo: https://..."
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            /><br />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div className="dietsCreate">
            <span>Type of Diet:</span>
            <select onChange={(e) => handleSelectDiet(e)}>
              {diets.map((d) => (
                <option value={d.name} key={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {input.diets.map((d, i) => (
              <ul key={i}>
                <li>{d}</li>
                <button onClick={(e) => handleDelete(e, d)}> X </button>
              </ul>
            ))}
            {errors.diets && <p>{errors.diets}</p>}
          </div>
          <button type="submit" className="btnCreate">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
