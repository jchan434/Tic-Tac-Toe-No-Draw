import GameState from "./GameState";

function NewGame({gameState, onNewGame}) {
    if (gameState === GameState.inProgress) return;
    return <button onClick = {onNewGame} className="reset-button">New Game</button>;
}

export default NewGame;