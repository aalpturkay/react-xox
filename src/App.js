import { useState, useEffect } from "react";

import GameBoard from "./components/GameBoard";
import InfoCard from "./components/InfoCard";

function getRandomPlayer() {
  const rand = Math.floor(Math.random() * 2);
  return rand === 1 ? "X" : "O";
}

function App() {
  const INITIAL_STATE = Array(9).fill("");
  const [cells, setCells] = useState(INITIAL_STATE);
  const [player, setPlayer] = useState("");
  const [endGame, setEndGame] = useState(false);
  const [winner, setWinner] = useState("");

  const WIN_CASES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    setPlayer(getRandomPlayer());
  }, []);

  useEffect(() => {
    if (cells === INITIAL_STATE) return;

    controlWinCases();
  }, [cells]);

  function restartGame() {
    setCells(INITIAL_STATE);
    setEndGame(false);
    setWinner(false);
    setPlayer(getRandomPlayer());
  }

  function controlWinCases() {
    WIN_CASES.map((val, i) => {
      if (
        cells[val[0]] !== "" &&
        cells[val[1]] !== "" &&
        cells[val[2]] !== ""
      ) {
        if (
          cells[val[0]] === cells[val[1]] &&
          cells[val[1]] === cells[val[2]]
        ) {
          setWinner(player);
          console.log(`Player ${player} win!`);
          setEndGame(true);
        }
      }
    });

    if (!cells.includes("")) {
      setWinner("Berabere");
      setEndGame(true);
    }

    if (endGame) {
      return;
    }

    changeTurn();
  }

  function changeTurn() {
    setPlayer(player === "X" ? "O" : "X");
  }

  function updateCells(index) {
    if (cells[index]) {
      return;
    }

    const updatedCells = [...cells];
    updatedCells[index] = player;
    setCells(updatedCells);
  }

  return (
    <div className="App">
      <GameBoard cells={cells} onClick={endGame ? null : updateCells} />
      <InfoCard
        player={player}
        winner={winner}
        endGame={endGame}
        onReset={restartGame}
      />
    </div>
  );
}

export default App;
