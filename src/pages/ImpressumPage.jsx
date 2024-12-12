import React from "react";
import { useTranslation } from "react-i18next"; // Hook für Übersetzungen
import { Link } from "react-router-dom"; // Für Navigation
import "./ImpressumPage.css"; // Für das Styling

const ImpressumPage = () => {
  const { t } = useTranslation(); // Hook für Übersetzungen

  return (
    <div className="impressum-page">
      {/* Oberer Balken */}
      <div className="header-bar"></div>

      {/* Inhalt der Impressum-Seite */}
      <div className="impressum-content">
        <h1>{t("impressum_title")}</h1> {/* Übersetzung des Titels */}
        <p>{t("impressum_intro")}</p> {/* Einführungstext, z. B. "Angaben gemäß § 5 TMG:" */}
        
        <p>
          <strong>{t("company_name")}</strong> <br />
          {t("address")}: Geheim <br />
          {t("postal_city")}: ***** GeheimHausen <br />
          {t("email")}: geheim@geheim.geheim <br />
          {t("phone")}: *********
        </p>
        
        <p>
          {t("content_responsible")}: <br />
          {t("responsible_person")}. <br />
          **********************************************
        </p>
        
        <p>{t("disclaimer")}</p> {/* Haftungsausschluss */}

        {/* Button zur Startseite */}
        <div className="back-button-container">
          <Link to="/" className="back-button">
            {t("back_to_home")} {/* Übersetzung des Button-Textes */}
          </Link>
        </div>
      </div>

      {/* Unterer Balken */}
      <div className="footer-bar"></div>
    </div>
  );
};

export default ImpressumPage;
