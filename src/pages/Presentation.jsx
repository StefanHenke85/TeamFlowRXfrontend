import React from "react";
import { useNavigate } from "react-router-dom";
import "./Presentation.css";

const Presentation = () => {
  const pdfUrl = "/Prasi.pdf";
  const navigate = useNavigate();

  return (
    <div className="presentation-container">
      <div className="button-container">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Zurück zur Startseite
        </button>
      </div>
      <div className="presentation-frame">
        <iframe
          src={pdfUrl}
          title="Präsentation"
          style={{
            position: 'fixed',
            top: '40px', // Platz für Flaggenleiste
            left: '0',
            width: '100%',
            height: 'calc(100vh - 40px)', // Vollbild minus Flaggenleiste
            border: 'none',
            zIndex: '999'
          }}
        />
      </div>
    </div>
  );
};

export default Presentation;
