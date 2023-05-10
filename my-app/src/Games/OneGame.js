import React, { useContext } from "react";
import { TournamentContext } from "./TournamentContext";

const OneGame = ({ game }) => {
    const { setCurrentGame } = useContext(TournamentContext);

    const handleResultClick = () => {
        setCurrentGame(game);
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