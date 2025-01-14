import React from "react";
import { useNavigate } from "react-router-dom";
import "./Presentation.css";

const Presentation = () => {
  const navigate = useNavigate();
  const geniallyUrl = "https://view.genially.com/6784ed4c3ebd3eeb1414c456/presentation-teamflowxr";

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
      <div className="link-container">
        <p>Klicke auf den Button, um die Präsentation zu öffnen:</p>
        <button 
          className="presentation-button"
          onClick={() => window.open(geniallyUrl, "_blank", "noopener,noreferrer")}
        >
          Präsentation öffnen
        </button>
      </div>
    </div>
  );
};

export default Presentation;

