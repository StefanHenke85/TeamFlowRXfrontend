import React from "react";
import { Routes, Route } from "react-router-dom";
// import StartPage from "./pages/StartPage";
// import RegisterPage from "./pages/RegisterPage";
import RoomSelectionPage from "./pages/RoomSelectionPage";
import Danke from "./pages/Danke";
import ImpressumPage from "./pages/ImpressumPage";
// import LoginPage from "./pages/LoginPage";
import CircleLayout from "./components/CircleLayout";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterLogin from "./pages/RegisterLogin";

const App = () => {
  return (
    <Routes>
      {/* Startseite */}
      <Route
        path="/"
        element={
          <div className="App">
            <CircleLayout />
          </div>
        }
      />
      {/* Weitere Seiten */}
      <Route path="/register" element={<RegisterLogin/>} />
      <Route path="/rooms" element={<RoomSelectionPage />} />
      <Route path="/danke" element={<Danke />} />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/room-selection" element={<RoomSelectionPage />} />
    </Routes>
  );
};

export default App;
