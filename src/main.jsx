import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n"; // Importiere die i18n-Konfiguration

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* BrowserRouter sollte hier die gesamte App umschließen */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
