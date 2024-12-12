import React from "react";


const CircleLayout = () => {
  return (
    <div className="start-page">
      <svg width="800" height="800" viewBox="0 0 800 800" className="circle-layout">
        {/* Register Button */}
        <a href="/register" className="circle-button">
          <path id="path-register" d="M400,400 m-250,0 a250,250 0 1,1 500,0 a250,250 0 1,1 -500,0" fill="none" />
          <text>
            <textPath href="#path-register" startOffset="5%" textAnchor="middle">RegisterLogin</textPath>
          </text>
        </a>

        {/* Impressum Button */}
        <a href="/impressum" className="circle-button">
          <path id="path-impressum" d="M400,400 m-200,-50 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0" fill="none" />
          <text>
            <textPath href="#path-impressum" startOffset="60%" textAnchor="middle">Impressum</textPath>
          </text>
        </a>

        {/* About Us Button */}
        <a href="/about-us" className="circle-button">
          <path id="path-about-us" d="M400,400 m-150,-100 a150,150 0 1,1 300,0 a150,150 0 1,1 -300,0" fill="none" />
          <text>
            <textPath href="#path-about-us" startOffset="40%" textAnchor="middle">About Us</textPath>
          </text>
        </a>

        {/* Login Button */}
        <a href="/login" className="circle-button">
          <path id="path-login" d="M400,400 m-300,100 a300,300 0 1,1 600,0 a300,300 0 1,1 -600,0" fill="none" />
          <text>
            <textPath href="#path-login" startOffset="90%" textAnchor="middle">Login</textPath>
          </text>
        </a>
      </svg>
    </div>
  );
};



export default CircleLayout;
