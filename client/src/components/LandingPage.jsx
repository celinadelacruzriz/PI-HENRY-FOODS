import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1>Bienvenid@s</h1>
      <Link to="./home" className="btnLan">
        <button>{` ENTRAR `}</button>
      </Link>
      <h2>María Celina de la Cruz Riz - PT 07</h2>
    </div>
  );
}
