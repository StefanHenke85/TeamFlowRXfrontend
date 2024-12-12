import React from "react";
import { Link } from "react-router-dom"; // Importiere Link für Navigation
import "./Login.css"; // Importiere die CSS-Datei für das Styling

const LoginPage = () => {
  return (
    <div className="Login-page">
      {/* Oberer Balken */}
      <div className="header-bar"></div>

      {/* Inhalt der Beschreibung-Seite */}
      <div className="login-content">
        <h1>Kurzbeschreibung der Software</h1>
        <p>Plattform für Teamwork und virtuelle Zusammenarbeit in 3D</p>
        <p>
          <strong>TeamFlow-XR</strong> <br />
          Adresse: Geheim <br />
          PLZ / Ort: ***** GeheimHausen <br />
          E-Mail: geheim@geheim.geheim <br />
          Telefon: *********
        </p>
        <p>
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: <br />
          Es geht halt wirklich keinen an. <br />
          **********************************************
        </p>
        <p>
          Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle
          übernehmen wir keine Haftung für die Inhalte externer Links. Für den
          Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
          verantwortlich.
        </p>

        {/* Button zur Startseite */}
        <div className="back-button-container">
          <Link to="/" className="back-button">
            Zur Startseite
          </Link>
        </div>
      </div>

      {/* Unterer Balken */}
      <div className="footer-bar"></div>
    </div>
  );
};

export default LoginPage;
