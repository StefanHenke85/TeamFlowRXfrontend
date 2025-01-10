import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import components and pages
import LanguageSwitcher from "./components/LanguageSwitcher";
import RoomSelectionPage from "./pages/RoomSelectionPage";
import ImpressumPage from "./pages/ImpressumPage";
import AboutUsPage from "./pages/AboutUsPage";
import StartPage from "./pages/StartPage";
import TechnologyPage from "./pages/TechnologyPage";
import Register from "./pages/Register"; // Neue Registrierungskomponente
import Verify from "./pages/Verify"; // Neue Verifizierungskomponente
import Login from "./pages/Login"; // Neue Login-Komponente
import Presentation from "./pages/Presentation";

const App = () => {
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentifizierung
  const [user, setUser] = useState(null); // Aktuelle Benutzerdaten

  useEffect(() => {
    // Überprüfen, ob der Benutzer eingeloggt ist
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setIsAuthenticated(true);
      setUser({ token: savedToken });
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("authToken", userData.token);
  };

  const handleLogout = () => {
    console.log("Ausloggen");
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const handleEditProfile = () => {
    console.log("Profil bearbeiten");
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Hintergrundvideo */}
      <video
        src="/wasser.mp4"
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      ></video>

      {/* Sprachumschalter */}
      <header>
        <LanguageSwitcher changeLanguage={changeLanguage} />
      </header>

      {/* Hauptinhalt */}
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/register" element={<Register />} /> {/* Registrierung */}
          <Route path="/verify" element={<Verify />} /> {/* Verifizierung */}
          <Route path="/login" element={<Login />} /> {/* Login */}
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/rooms" element={<RoomSelectionPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/room-selection" element={<RoomSelectionPage />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route
            path="/edit-profile"
            element={<div>Profil bearbeiten Seite</div>}
          />
          <Route path="/logout" element={<div>Erfolgreich ausgeloggt</div>} />
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
