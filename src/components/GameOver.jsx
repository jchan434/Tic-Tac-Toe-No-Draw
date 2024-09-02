import GameState from "./GameState"

function GameOver({gameState}) {
    switch (gameState) {
        case GameState.inProgress:
            return <></>
        case GameState.playerXWins:
            return <div className="game-over">Player X Wins!</div>
        case GameState.playerOWins:
            return <div className="game-over">Player O Wins!</div>
    }
    // return <div className="game-over">
    //     Game Over
    // </div>;
}

export default GameOver;