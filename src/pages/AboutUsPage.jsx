import React from "react";
import { Link } from "react-router-dom"; // Importiere Link für Navigation
import "./AboutUsPage.css"; // Importiere die CSS-Datei für das Styling

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      {/* Oberer Balken */}
      <div className="header-bar"></div>

      {/* Inhalt der About Us-Seite */}
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>
          Willkommen bei <strong>TeamFlow-XR</strong>! Wir sind ein Team, das sich darauf spezialisiert hat, kreative und 
          interaktive Plattformen zu entwickeln, die Zusammenarbeit auf die nächste Ebene heben.
        </p>
        <p>
          Unser Ziel ist es, durch innovative Technologie Menschen weltweit zu verbinden und effektive 
          Teamarbeit in einem immersiven und dynamischen Umfeld zu ermöglichen.
        </p>
        <p>
          Vielen Dank, dass Sie ein Teil unserer Vision sind. Gemeinsam gestalten wir die Zukunft der Zusammenarbeit!
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

export default AboutUsPage;
