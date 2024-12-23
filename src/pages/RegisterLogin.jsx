import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./RegisterLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterLogin = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const userProfileImage = "https://via.placeholder.com/50"; // Beispiel-Profilbild
  const userFullName = "Max Mustermann"; // Beispiel-Benutzername

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      setShowOverlay(true); // Overlay anzeigen
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        email,
      });
      setMessage(response.data.message || t("register_success"));
    } catch (error) {
      setMessage(error.response?.data?.error || t("register_error"));
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const userToken = response.data.token;
      setToken(userToken);
      setMessage(t("login_success"));
      setIsLoggedIn(true);
      localStorage.setItem("authToken", userToken);
      setShowOverlay(true); // Overlay anzeigen
      navigate("/room-selection");
    } catch (error) {
      setMessage(error.response?.data?.error || t("login_error"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setToken("");
    setShowOverlay(false); // Overlay ausblenden
    navigate("/");
  };

  const handleVerifyCode = async () => {
    try {
      // Verifikationscode verarbeiten
      const response = await axios.post("http://localhost:5000/verify", {
        email,
        verificationCode,
      });
      setMessage(response.data.message || t("verification_success"));
    } catch (error) {
      setMessage(error.response?.data?.error || t("verification_error"));
    }
  };

  return (
    <div className="container">
      <h1>{t("register_login")}</h1>
      <div className="form-container">
        <div className="form-section">
          <h2>{t("register")}</h2>
          <input
            type="text"
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button" onClick={handleRegister}>
            {t("register")}
          </button>
        </div>

        <div className="form-section">
          <h2>{t("login")}</h2>
          <input
            type="text"
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={handleLogin}>
            {t("login")}
          </button>
        </div>

        <div className="form-section">
          <h2>{t("verification")}</h2>
          <input
            type="email"
            placeholder={t("email_verification")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder={t("verification_code")}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className="button" onClick={handleVerifyCode}>
            {t("verify_code")}
          </button>
        </div>
      </div>

      <p>{message}</p>

      {isLoggedIn && (
        <div>
          <button className="button" onClick={() => navigate("/room-selection")}>
            {t("room_selection")}
          </button>
          <button className="button" onClick={handleLogout}>
            {t("logout")}
          </button>
        </div>
      )}

      <a href="/" className="link">
        {t("back_to_home")}
      </a>

      {/* Overlay Menü für angemeldete Benutzer */}
      {isLoggedIn && (
        <div className={`overlay-menu ${showOverlay ? "show" : ""}`}>
          <img src={userProfileImage} alt="Profilbild" />
          <p>{userFullName}</p>
          <button onClick={() => navigate("/profile")}>{t("profile")}</button>
          <button onClick={() => navigate("/personal-data")}>{t("personal_data")}</button>
          <button onClick={handleLogout}>{t("logout")}</button>
        </div>
      )}
    </div>
  );
};

export default RegisterLogin;
