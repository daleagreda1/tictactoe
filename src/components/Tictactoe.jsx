import { useState, useEffect } from "react";
import Board from "./Board";
import Gameover from "./Gameover";
import Gamestate from "./Gamestate";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/gameover.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset)
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset)
clickSound.volume = 0.5;


const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
    
  {combo:[0,1,2], strikeClass:"strike-row-1"},
  {combo:[3,4,5], strikeClass:"strike-row-2"},
  {combo:[6,7,8], strikeClass:"strike-row-3"},

  {combo:[0,3,6], strikeClass:"strike-column-1"},
  {combo:[1,4,7], strikeClass:"strike-column-2"},
  {combo:[2,5,8], strikeClass:"strike-column-3"},

  {combo:[0,4,8], strikeClass:"strike-diagonal-1"},
  {combo:[2,4,6], strikeClass:"strike-diagonal-2"},

];

function checkWinner(tiles, setStrikeClass, setGamestate){
    for (const {combo, strikeClass} of winningCombinations){
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if(
            tileValue1 !== null && 
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3
        ) {
            setStrikeClass(strikeClass);
            if(tileValue1=== PLAYER_X){
                setGamestate(Gamestate.playerXwins)
            }else{
              (tileValue1=== PLAYER_O)
                setGamestate(Gamestate.playerOwins)
            }
        }
    }
    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
    if(areAllTilesFilledIn){
        setGamestate(Gamestate.draw);
    }
}

function Tictactoe(){
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGamestate] = useState(Gamestate.inProgress);

    const handleTileClick = (index) => {
        if(gameState!== Gamestate.inProgress){
            return;
        }
        if(tiles[index] !== null){
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if(playerTurn === PLAYER_X){
            setPlayerTurn(PLAYER_O);
        } else{
            setPlayerTurn(PLAYER_X);
        }
        return;
    };

    const handleReset = () => {
        setGamestate(Gamestate.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    };

    useEffect(()=>{
    checkWinner(tiles, setStrikeClass, setGamestate);
    }, [tiles]);

    useEffect( () => {
       if(tiles.some((tile) => tile !== null)){
        clickSound.play();
       }
    }, [tiles]);

    useEffect( () => {
        if(gameState !== Gamestate.inProgress){
         gameOverSound.play();
        }
     }, [gameState]);

    return(
        <div>
            <h1>Tic Tac Toe</h1>    
            <Board playerTurn={playerTurn} 
            tiles={tiles} 
            onTileClick={handleTileClick} 
            strikeClass={strikeClass}/>
            <Gameover gameState={gameState}/>
            <Reset gameState ={gameState} onReset={handleReset}/>
    </div>
    );
}
export default Tictactoe;