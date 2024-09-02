import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import GameState from "./components/GameState";
import NewGame from "./components/NewGame";

const winningCombinations = [
  //rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState, tilesOrder, setTiles, setTilesOrder) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      tileValue1 === "X"
        ? setGameState(GameState.playerXWins)
        : setGameState(GameState.playerOWins);
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    const newTiles = [...tiles];
    newTiles[tilesOrder[0]] = null;
    setTiles(newTiles);
    setTilesOrder([...tilesOrder].slice(1));
  }
}

function Game() {
  const [playerTurn, setPlayerTurn] = useState("X");
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);
  const [tilesOrder, setTilesOrder] = useState(Array());
  const hangleTileClick = (index) => {
    if (gameState !== GameState.inProgress) return;
    if (tiles[index] !== null) return;
    const newTiles = [ ...tiles ];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setTilesOrder([...tilesOrder, index]);
    playerTurn === "X" ? setPlayerTurn("O") : setPlayerTurn("X");
  };

  const handleNewGame = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
	setTilesOrder(Array())
    setPlayerTurn("X");
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState, tilesOrder, setTiles, setTilesOrder);
	console.log(tilesOrder);
    console.log(tiles);
  }, [tiles]);

  return (
    <div>
      <div className="info">
        <h1>Tic Tac Toe</h1>
      </div>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={hangleTileClick}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <NewGame gameState={gameState} onNewGame={handleNewGame} />
    </div>
  );
}

export default Game;
