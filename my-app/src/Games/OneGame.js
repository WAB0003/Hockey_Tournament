import React, { useContext } from "react";
import { TournamentContext } from "./TournamentContext";

const OneGame = ({ game }) => {
    const { setCurrentGame, currentRound, setCurrentRound, setIsResultFormVisible } = useContext(TournamentContext);

    const handleResultClick = () => {
        setCurrentGame(game);
        setIsResultFormVisible(true);
        if (game.id <= 4 && currentRound === 1) {
            setCurrentRound(2);
        } else if (game.id > 4 && currentRound === 2) {
            setCurrentRound(3);
        }
    };

    return (
        <div className="game">
            <div>{game.home_team ? game.home_team.name : "TBD"}</div>
            <div>{game.away_team ? game.away_team.name : "TBD"}</div>
            <button onClick={handleResultClick}>Result</button>
        </div>
    );
};

export default OneGame;