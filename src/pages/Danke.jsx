import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Danke.css";

const DankePage = () => {
  useEffect(() => {
    createConfetti();
  }, []);

  const createConfetti = () => {
    const body = document.body;
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.backgroundColor = randomColor();
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      body.appendChild(confetti);

      // Entferne Konfetti nach der Animation
      setTimeout(() => {
        body.removeChild(confetti);
      }, 3000);
    }
  };

  const randomColor = () => {
    const colors = ["#ff8c00", "#ff0080", "#6a11cb", "#2575fc", "#00ff7f"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="danke-page">
      <h1>🎉 Erfolgreich registriert! 🎉</h1>
      <p>
        Vielen Dank für Ihre Anmeldung! Wir freuen uns, Sie in unserer Community
        willkommen zu heißen. Starten Sie jetzt und entdecken Sie neue
        Möglichkeiten.
      </p>
      <Link to="/" className="back-button">
        Zurück zur Startseite
      </Link>
    </div>
  );
};

export default DankePage;
