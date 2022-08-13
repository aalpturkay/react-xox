import React from "react";
import "./Square.css";
function Square({ val, onClick }) {
  return (
    <div className="square" onClick={onClick}>
      {val}
    </div>
  );
}

export default Square;
