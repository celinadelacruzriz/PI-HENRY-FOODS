import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByDiet,
  getTypesOfDiet,
  orderByName,
  orderByScoreLikes,
  deleteRecipe,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import DeleteBar from "./DeleteBar";
import "../styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  //Paginado:
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // eslint-disable-next-line
  const [orderName, setOrderName] = useState("");
  // eslint-disable-next-line
  const [orderLike, setOrderLike] = useState("");

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function onClose(id) {
    dispatch(deleteRecipe(id));
  }
  function handleSelectTypeOfDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }

  function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
  }

  function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScoreLikes(e.target.value));
    setCurrentPage(1);
    setOrderLike("Order" + e.target.value);
  }

  return (
    <div className="home">
      <h1>Web para Recetas</h1>
      <div>
        <SearchBar />
        <DeleteBar />
        <Link to="/recipe" className="linkCreate">
          <button className="btnCreate">CREAR RECETA</button>
        </Link>
      </div>
      <div className="showAll">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          MOSTRAR TODAS LAS RECETAS
        </button>
      </div>
      <div className="select">
        <span className="span">ORDENAR POR NOMBRE RECETA</span>
        <select onChange={(n) => handleSelectByName(n)}>
          <option value="default">TODAS</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <span className="span">ORDENAR POR SCORE</span>
        <select onChange={(s) => handleSelectByScore(s)}>
          <option value="All">TODAS</option>
          <option value="Asc">SCORE MAS ALTO</option>
          <option value="Desc">SCORE MAS BAJO</option>
        </select>
        <span className="span">FILTRAR POR TIPO DE DIETA</span>
        <select onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">TODAS LAS DIETAS</option>
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div className="paginate">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
      <div className="cards">
        {currentRecipes?.map((c) => (
          <div key={c.id}>
            <button
              onClick={() => {
                onClose(c.id);
              }}
              className="btnClose"
            >
              X
            </button>
            <Link to={"/home/" + c.id} className="linkCard">
              <Card
                title={c.title}
                image={
                  c.image ? (
                    c.image
                  ) : (
                    <img src="../images/404_image" alt="Img not provided" />
                  )
                }
                diets={
                  c.createdDb
                    ? c.diets.map((d) => (
                        <p key={d.name} className="dietsMap">
                          {d.name}
                        </p>
                      ))
                    : c.diets.map((d) => (
                        <p key={d} className="dietsMap">
                          {d}
                        </p>
                      ))
                }
                vegetarian={
                  c.vegetarian === true ? (
                    <p className="dietsMap">vegetarian</p>
                  ) : (
                    <p></p>
                  )
                }
                score={c.aggregateLikes}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="paginate">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
