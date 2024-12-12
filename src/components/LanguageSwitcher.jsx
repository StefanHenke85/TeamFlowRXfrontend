// LanguageSwitcher.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import usaFlag from "../assets/flags/united-states-of-america-flag-small.jpg";
import germanyFlag from "../assets/flags/germany-flag-icon-64.png";
import franceFlag from "../assets/flags/france-flag-small.jpg";
import russiaFlag from "../assets/flags/russia-flag-small.jpg";
import chinaFlag from "../assets/flags/china-flag-small.jpg";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang); // Speichere die gewählte Sprache im Local Storage
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage("en")}>
        <img src={usaFlag} alt="English" />
      </button>
      <button onClick={() => changeLanguage("de")}>
        <img src={germanyFlag} alt="Deutsch" />
      </button>
      <button onClick={() => changeLanguage("fr")}>
        <img src={franceFlag} alt="Français" />
      </button>
      <button onClick={() => changeLanguage("ru")}>
        <img src={russiaFlag} alt="Русский" />
      </button>
      <button onClick={() => changeLanguage("zh")}>
        <img src={chinaFlag} alt="中文" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
