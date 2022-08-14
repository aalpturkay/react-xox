import React from "react";
import "./GameBoard.css";
import Square from "./Square";

function GameBoard({ cells, onClick }) {
  return (
    <div className="game-board">
      {cells.map((val, index) => {
        return (
          <Square
            key={index}
            val={val}
            onClick={() => {
              if (onClick !== null) onClick(index);
            }}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;
