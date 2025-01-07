import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Register.css";

const API_BASE_URL = "http://63.176.154.221:5173/register"; // Ersetze dies durch deine EC2-Adresse

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/register`, { username, password, email });
      setMessage(t("register_success"));
      navigate("/verify");
    } catch (error) {
      setMessage(error.response?.data?.error || t("register_error"));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form">
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
        <button type="button" onClick={handleRegister}>
          {t("register_button")}
        </button>
        <div
          className="login-button"
          onClick={() => navigate("/login")}
        >
          {t("already_registered")}
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Register;
