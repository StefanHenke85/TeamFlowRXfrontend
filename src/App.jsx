import React from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import components and pages
import LanguageSwitcher from "./components/LanguageSwitcher";
import CircleLayout from "./components/CircleLayout";
import RoomSelectionPage from "./pages/RoomSelectionPage";
import Danke from "./pages/Danke";
import ImpressumPage from "./pages/ImpressumPage";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterLogin from "./pages/RegisterLogin";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage"; // Importiere die Login-Seite

const App = () => {
  const { t, i18n } = useTranslation(); // Für Übersetzungen und Sprachwechsel

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Speichern der Sprache im localStorage
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Hintergrundvideo */}
      <video
        src="/wasser.mp4" // Stelle sicher, dass "wasser.mp4" im "public"-Ordner liegt
        autoPlay
        loop
        muted
        style={{
          position: "fixed", // Fixiert das Video als Hintergrund
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Passt das Video an den Container an
          zIndex: -1, // Sendet das Video in den Hintergrund
        }}
      ></video>

      {/* Sprachumschalter */}
      <header>
        <LanguageSwitcher changeLanguage={changeLanguage} />
      </header>

      {/* Hauptinhalt */}
      <main>
        <Routes>
          {/* Startseite */}
          <Route path="/" element={<StartPage />} />

          {/* Authentifizierung */}
          <Route path="/RegisterLogin" element={<RegisterLogin />} />
          <Route path="/login" element={<LoginPage />} /> {/* Login-Route */}

          {/* Weitere Seiten */}
          <Route path="/rooms" element={<RoomSelectionPage />} />
          <Route path="/danke" element={<Danke />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/room-selection" element={<RoomSelectionPage />} />

          {/* Fallback-Seite für ungültige URLs */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>{t("page_not_found")}</h2>
                <p>{t("return_home")}</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
