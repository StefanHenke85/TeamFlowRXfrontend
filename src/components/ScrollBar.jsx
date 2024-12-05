import React from "react";
import "./ScrollBar.css";

const ScrollBar = () => {
  const items = [
    { id: 1, name: "Item 1", img: "C:\\Users\\mobil\\Desktop\\Projekt\\frontend\\public\\teamflowmeets2.webp" },
    { id: 2, name: "Item 2", img: "/images/item2.jpg" },
    { id: 3, name: "Item 3", img: "/images/item3.jpg" },
  ];

  return (
    <div className="scroll-container">
      {/* Dynamische Items mit Bildern */}
      {items.map((item) => (
        <div key={item.id} className="scroll-item">
          <img
            src={item.img}
            alt={item.name}
            style={{ width: "100%", height: "80%", borderRadius: "10px" }}
          />
          <p>{item.name}</p>
        </div>
      ))}

      {/* Statische Elemente */}
      <div className="scroll-item">Item 4</div>
      <div className="scroll-item">Item 5</div>
      <div className="scroll-item">Item 6</div>
    </div>
  );
};

export default ScrollBar;

