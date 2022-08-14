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
    if (cells === INITIAL_STATE) {
      setPlayer(getRandomPlayer());
      console.log("Set random player");
    }
  }, []);

  useEffect(() => {
    if (cells === INITIAL_STATE) return;

    controlTie();
    controlWinCases();
  }, [cells]);

  function restartGame() {
    setEndGame(false);
    setWinner("");
    setPlayer(getRandomPlayer());
    setCells(INITIAL_STATE);
  }

  function controlWinCases() {
    for (let i = 0; i < WIN_CASES.length; i++) {
      const winCase = WIN_CASES[i];
      const first = cells[winCase[0]];
      const second = cells[winCase[1]];
      const third = cells[winCase[2]];

      if (first === "" || second === "" || third === "") {
        continue;
      }
      if (first === second && second === third) {
        setWinner(player);
        setEndGame(true);
        break;
      }
    }

    if (!endGame) changeTurn();
  }

  function controlTie() {
    if (!cells.includes("")) {
      setWinner("Berabere");
      setEndGame(true);
    }
  }

  function changeTurn() {
    console.log("Turn");
    console.log(endGame);
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
