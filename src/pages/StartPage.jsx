import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaInfoCircle, FaFileAlt, FaMicrochip, FaTv } from "react-icons/fa";
import "./StartPage.css";
import TranslationErrorMessage from "./TranslationErrorMessage";

const StartPage = () => {
  return (
    <div className="start-page">
      {/* Hintergrundbild */}
      <img src="start.png" alt="Startseite" className="background-image" />

      {/* Buttons mit Icons */}
      <div className="buttons-container">
        {/* Technologie-Button */}
        <Link to="/technology" className="circle-button top">
          <FaMicrochip className="button-icon" />
        </Link>

        <Link to="/about-us" className="circle-button left">
          <FaInfoCircle className="button-icon" />
        </Link>

        <Link to="/impressum" className="circle-button right">
          <FaFileAlt className="button-icon" />
        </Link>

        <Link to="/login" className="circle-button bottom">
          <FaUser className="button-icon" />
        </Link>

        {/* Präsentations-Button */}
        <Link to="/presentation" className="circle-button presentation">
          <FaTv className="button-icon" />
        </Link>
      </div>

      {/* Modernerer Willkommenstext */}
      <div className="welcome-container">
        <h1 className="welcome-title">TEAMFLOWXR</h1>
        <div className="welcome-subtitle">
          <span className="highlight">Kommunikation.</span>
          <span className="highlight">Innovation.</span>
          <span className="highlight">Zukunft.</span>
        </div>
      </div>

      {/* Hinweis zu Übersetzungsfehlern */}
      <TranslationErrorMessage />
    </div>
  );
};

export default StartPage;
