import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google"; // GoogleLogin importieren
import "./Login.css";

const API_BASE_URL = "http://63.176.154.221:5173"; // Ersetze dies durch deine EC2-Adresse

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      localStorage.setItem("authToken", response.data.token);
      setMessage(t("login_success"));
      navigate("/https://teamflowrx.de/teamflowrx/meets/");
    } catch (error) {
      setMessage(error.response?.data?.error || t("login_error"));
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential; // Google OAuth Token
      const res = await axios.post(`${API_BASE_URL}/google-login`, { token: googleToken });
      localStorage.setItem("authToken", res.data.token);
      setMessage(t("login_success"));
      navigate("/https://teamflowrx.de/teamflowrx/meets/");
    } catch (error) {
      setMessage(error.response?.data?.error || t("login_error"));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1>{t("login_title")}</h1>
        <input
          type="text"
          placeholder={t("username_placeholder")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("password_placeholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          {t("login_button")}
        </button>
        {message && <p className="message">{message}</p>}

        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin} // Erfolgreiche Authentifizierung
          onError={() => setMessage(t("google_login_error"))} // Fehlerbehandlung
        />

        <div className="register-button" onClick={() => navigate("/register")}>
          {t("not_registered_yet")}
        </div>
      </form>
    </div>
  );
};

export default Login;
