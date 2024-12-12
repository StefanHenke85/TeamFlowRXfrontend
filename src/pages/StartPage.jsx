import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./StartPage.css";

const StartPage = () => {
  const { t } = useTranslation(); // Übersetzungsfunktion aktivieren

  return (
    <div className="start-page">
      {/* Hintergrundbild */}
      <img src="start.png" alt="Startseite" className="background-image" />

      {/* Animierter Wasser-Kreis */}
      <div className="water-circle"></div>

      {/* Buttons um den Kreis herum */}
      <div className="buttons-container">
        <Link to="/login" className="circle-button top">
          {t("login")} {/* Übersetzung für Login */}
        </Link>
        <Link to="/about-us" className="circle-button left">
          {t("about_us")} {/* Übersetzung für About Us */}
        </Link>
        <Link to="/impressum" className="circle-button right">
          {t("impressum")} {/* Übersetzung für Impressum */}
        </Link>
        <Link to="/registerlogin" className="circle-button bottom">
          {t("register")} {/* Übersetzung für Register */}
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
