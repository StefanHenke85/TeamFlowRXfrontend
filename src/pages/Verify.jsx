import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Verify.css";

const API_BASE_URL = "http://63.176.154.221:5173/verify"; // Ersetze dies durch deine EC2-Adresse

const Verify = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      await axios.post(`${API_BASE_URL}/verify`, { username, code: verificationCode });
      setMessage(t("verification_success"));
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.error || t("verification_error"));
    }
  };

  return (
    <div className="verify-container">
      <h1>{t("verify")}</h1>
      <input
        type="text"
        placeholder={t("username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder={t("verification_code")}
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerify}>{t("verify_code")}</button>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
