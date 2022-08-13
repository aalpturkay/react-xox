import React from "react";
import "./InfoCard.css";

function InfoCard({ player, winner, endGame, onReset }) {
  return (
    <div className="info-card">
      {endGame ? (
        <div>
          <p>Kazanan: {winner}</p>
          <button
            onClick={() => {
              onReset();
            }}
            className="btn"
          >
            Yeniden Oyna
          </button>
        </div>
      ) : (
        <p>Oyuncu: {player}</p>
      )}
    </div>
  );
}

export default InfoCard;
