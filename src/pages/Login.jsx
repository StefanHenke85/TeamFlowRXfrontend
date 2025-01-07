import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Login.css";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("authToken", response.data.token);
      setMessage(t("login_success"));
      navigate("/room-selection"); // Weiterleitung nach erfolgreichem Login
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
        <div
          className="register-button"
          onClick={() => (window.location.href = "/register")}
        >
          {t("not_registered_yet")}
        </div>
      </form>
    </div>
  );
};

export default Login;
