import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import "./Whiteboard.css";

const Whiteboard = () => {
  return (
    <div className="whiteboard-container">
      <ReactSketchCanvas
        strokeWidth={4}
        strokeColor="#A259FF" /* Lila Farbe für die Linien */
        style={{ width: "900px", height: "550px" }}
        canvasColor="rgba(255, 255, 255, 0.8)" /* Weiß mit leichter Transparenz */
      />
    </div>
  );
};

export default Whiteboard;
