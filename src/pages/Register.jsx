import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Register.css";

// API URL für dein Backend
const API_BASE_URL = "http://63.176.154.221:8080"; // Ändere dies auf den richtigen Port, z.B. 8080

const Register = () => {
  const { t } = useTranslation(); // Übersetzungsfunktion
  const navigate = useNavigate(); // Für Navigation zwischen Seiten
  const [username, setUsername] = useState(""); // Zustand für den Benutzernamen
  const [password, setPassword] = useState(""); // Zustand für das Passwort
  const [email, setEmail] = useState(""); // Zustand für die E-Mail-Adresse
  const [message, setMessage] = useState(""); // Zustand für Fehlermeldungen oder Erfolg

  // Funktion zum Registrieren des Benutzers
  const handleRegister = async (e) => {
    e.preventDefault(); // Verhindert das Standardformularverhalten

    try {
      // API-Aufruf zur Registrierung des Benutzers
      await axios.post(`${API_BASE_URL}/register`, { username, password, email });
      setMessage(t("register_success")); // Erfolgsnachricht setzen
      navigate("/verify"); // Nach erfolgreicher Registrierung zur Verifizierungsseite navigieren
    } catch (error) {
      // Fehlerbehandlung, wenn etwas schief geht
      setMessage(error.response?.data?.error || t("register_error"));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h1>{t("register_title")}</h1>
        <input
          type="text"
          placeholder={t("username_placeholder")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder={t("email_placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("password_placeholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{t("register_button")}</button>
        <div
          className="login-button"
          onClick={() => navigate("/login")}
        >
          {t("already_registered")}
        </div>
        <p>{message}</p> {/* Hier wird die Nachricht angezeigt (Erfolg oder Fehler) */}
      </form>
    </div>
  );
};

export default Register;
