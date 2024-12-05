import React from "react";
import { Link } from "react-router-dom";
import "./StartPage.css";

const StartPage = () => {
  return (
    <div className="start-page">
      <div className="buttons-container">
        {/* Register Button */}
        <Link to="/registerlogin" className="button curved-text">
          <svg width="250" height="150">
            <path id="curve1" d="M3,150 Q2,10 390,7" fill="none" stroke="none" />
            <text fontSize="40" fill="white">
              <textPath href="#curve1" startOffset="20%">
                <tspan className="rotate-word" x="0" dy="-20">Register</tspan>
              </textPath>
            </text>
          </svg>
        </Link>

        {/* Impressum Button */}
        <Link to="/impressum" className="button curved-text">
          <svg width="300" height="100">
            <path id="curve-impressum" d="M10,40 Q150,100 290,40" fill="none" stroke="none" />
            <text fontSize="16" fill="white">
              <textPath href="#curve-impressum" startOffset="10%">
                <tspan className="rotate-word" x="0" dy="0">Impressum</tspan>
              </textPath>
            </text>
          </svg>
        </Link>

        {/* About Us Button */}
        <Link to="/about-us" className="button curved-text">
          <svg width="300" height="100">
            <path id="curve3" d="M10,70 Q200,90 390,70" fill="none" stroke="none" />
            <text fontSize="16" fill="white">
              <textPath href="#curve3" startOffset="30%">
                <tspan className="rotate-word" x="0" dy="0">About</tspan>
                <tspan className="rotate-word" x="0" dy="10">Us</tspan>
              </textPath>
            </text>
          </svg>
        </Link>

        {/* Login Button */}
        <Link to="/login" className="button curved-text">
          <svg width="300" height="100">
            <path id="curve4" d="M10,70 Q200,30 390,70" fill="none" stroke="none" />
            <text fontSize="16" fill="white">
              <textPath href="#curve4" startOffset="15%">
                <tspan className="rotate-word" x="0" dy="0">Login</tspan>
              </textPath>
            </text>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
