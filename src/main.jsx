import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importiere den GoogleOAuthProvider
import "./i18n"; // Importiere die i18n-Konfiguration

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* BrowserRouter sollte hier die gesamte App umschließen */}
    <BrowserRouter>
      {/* Füge den GoogleOAuthProvider mit deiner Google Client ID hinzu */}
      <GoogleOAuthProvider clientId="804491155832-v3njmknvrilihrf8655vqd0eeikpvugd.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
