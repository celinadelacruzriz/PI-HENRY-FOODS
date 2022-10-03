import React from "react";
import "../styles/Card.css";

const newImage = "../images/404_image";

export default function Card({ title, image, diets, vegetarian, score }) {
  if (image.length < 10) image = newImage;
  return (
    <div className="cardComp">
      <div>
        <h3>{title}</h3>
      </div>
      <img
        src={image}
        alt="Img recipe not found"
        width="150px"
        height="150px"
      />
      <h5 className="typeOfD">Score: {score}</h5>
      <h5 className="typeOfD">Type of Diet:</h5>
      <h5 className="diets">
        {diets}
        {vegetarian}
      </h5>
    </div>
  );
}
