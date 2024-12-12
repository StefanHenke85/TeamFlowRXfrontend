import React from "react";
import { Link } from "react-router-dom"; // Importiere Link für Navigation
import { useTranslation } from 'react-i18next'; // Importiere useTranslation
import "./AboutUsPage.css"; // Importiere die CSS-Datei für das Styling

const AboutUsPage = () => {
  const { t } = useTranslation(); // Verwende useTranslation für Übersetzungen

  return (
    <div className="about-us-page">
      {/* Oberer Balken */}
      <div className="header-bar"></div>

      {/* Inhalt der About Us-Seite */}
      <div className="about-us-content">
        <h1>{t('about_us')}</h1> {/* Übersetzung des Titels */}
        <p>
          {t('welcome_message')} <strong>TeamFlow-XR</strong>! {t('about_us_description')}
        </p>
        <p>
          {t('goal_message')}
        </p>
        <p>
          {t('thank_you_message')}
        </p>

        {/* Button zur Startseite */}
        <div className="back-button-container">
          <Link to="/" className="back-button">
            {t('back_to_home')} {/* Übersetzung für den Button */}
          </Link>
        </div>
      </div>

      {/* Unterer Balken */}
      <div className="footer-bar"></div>
    </div>
  );
};

export default AboutUsPage;
