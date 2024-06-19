import Gamestate from "./Gamestate";

function Gameover({gameState}) {
    switch(gameState){
        case Gamestate.inProgress:
        return<></>;
        case Gamestate.playerOwins:
            return <div className="game-over">O WINS</div>;
        case Gamestate.playerXwins:
            return <div className="game-over">X WINS</div>;
        case Gamestate.draw:
            return <div className="game-over">DRAW</div>;
        default:
            return<></>; 
    }
}

export default Gameover;