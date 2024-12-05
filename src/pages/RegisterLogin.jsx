import React, { useState } from "react";
import "./RegisterLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Zum Navigieren nach erfolgreichem Login

const RegisterLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status für den Login
  const [token, setToken] = useState(""); // Token speichern
  const navigate = useNavigate(); // useNavigate für Navigation

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        email,
      });
      setMessage(response.data.message || "Registrierung erfolgreich! Überprüfe deine E-Mail.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Fehler bei der Registrierung.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setToken(response.data.token); // Token speichern
      setMessage("Login erfolgreich!"); // Erfolgsmeldung ohne den Token anzuzeigen
      setIsLoggedIn(true); // Login erfolgreich, Button zur Room-Auswahl anzeigen

      // Nach dem erfolgreichen Login zur Room-Selection navigieren
      navigate("/room-selection"); // Navigiere zur Room-Selection-Seite
    } catch (error) {
      setMessage(error.response?.data?.error || "Fehler beim Login.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify", {
        username,
        code: verificationCode,
      });
      setMessage(response.data.message || "Verifizierung erfolgreich!");
    } catch (error) {
      setMessage(error.response?.data?.error || "Fehler bei der Verifizierung.");
    }
  };

  const handleDragStart = (e) => {
    const container = e.target;
    const offsetX = e.clientX - container.getBoundingClientRect().left;
    const offsetY = e.clientY - container.getBoundingClientRect().top;

    const handleDragMove = (e) => {
      container.style.left = e.clientX - offsetX + "px";
      container.style.top = e.clientY - offsetY + "px";
    };

    const handleDragEnd = () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className="container" onMouseDown={handleDragStart}>
      <h1>Registrieren / Login</h1>
      <div className="form-container">
        <div className="form-section">
          <h2>Registrieren</h2>
          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button" onClick={handleRegister}>
            Registrieren
          </button>
        </div>

        <div className="form-section">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Benutzername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>

        <div className="form-section">
          <h2>Verifizierung</h2>
          <input
            type="email"
            placeholder="E-Mail-Adresse (zur Verifizierung)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Verifizierungscode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className="button" onClick={handleVerifyCode}>
            Code Verifizieren
          </button>
        </div>
      </div>

      {/* Erfolgs- oder Fehlermeldung */}
      <p>{message}</p>

      {/* Button zur Room-Auswahl nur anzeigen, wenn eingeloggt */}
      {isLoggedIn && (
        <button className="button" onClick={() => navigate("/RoomSelectionPage")}>
          Zur Room-Selection
        </button>
      )}

      <a href="/" className="link">
        Zurück zur Startseite
      </a>
    </div>
  );
};

export default RegisterLogin;
