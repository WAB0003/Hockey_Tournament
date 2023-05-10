import React, { useContext } from "react";
import { TournamentContext } from "./TournamentContext";

const OneGame = ({ game }) => {
    const { setCurrentGame, currentRound, setCurrentRound } = useContext(TournamentContext);

    const handleResultClick = () => {
        setCurrentGame(game);
        if (game.id <= 4 && currentRound === 1) {
            setCurrentRound(2);
        } else if (game.id > 4 && currentRound === 2) {
            setCurrentRound(3);
        }
    };

    return (
        <div className="game">
            <div>{game.home_team.name}</div>
            <div>{game.away_team.name}</div>
            <button onClick={handleResultClick}>Result</button>
        </div>
    );
};

export default OneGame;