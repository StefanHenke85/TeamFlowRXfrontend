import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaInfoCircle, FaFileAlt, FaMicrochip } from "react-icons/fa"; // FaMicrochip als Technologie-Icon importieren
import "./StartPage.css";
import TranslationErrorMessage from "./TranslationErrorMessage"; // Hinweis-Komponente importieren

const StartPage = () => {
  return (
    <div className="start-page">
      {/* Hintergrundbild */}
      <img src="start.png" alt="Startseite" className="background-image" />

      {/* Animierter Wasser-Kreis */}
      <div className="water-circle"></div>

      {/* Buttons mit Icons */}
      <div className="buttons-container">
        {/* Technologie-Button */}
        <Link to="/technology" className="circle-button top">
          <FaMicrochip className="button-icon" /> {/* Technologie Icon */}
        </Link>

        <Link to="/about-us" className="circle-button left">
          <FaInfoCircle className="button-icon" /> {/* About Us Icon */}
        </Link>

        <Link to="/impressum" className="circle-button right">
          <FaFileAlt className="button-icon" /> {/* Impressum Icon */}
        </Link>

        <Link to="/registerlogin" className="circle-button bottom">
          <FaUser className="button-icon" /> {/* Register Icon */}
        </Link>
      </div>

      {/* Hinweis zu Übersetzungsfehlern */}
      <TranslationErrorMessage />
    </div>
  );
};

export default StartPage;
