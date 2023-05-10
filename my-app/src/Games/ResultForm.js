import React, { useContext, useState } from "react";
import axios from "axios";
import { TournamentContext } from "./TournamentContext";

const ResultForm = () => {
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [mvp, setMvp] = useState('');

    const { currentGame, refreshGames, determineWinner, updateNextGame, setIsResultFormVisible } = useContext(TournamentContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = {
            home_points: homeScore,
            away_points: awayScore,
            mvp_player_id: mvp
        };

        try {
            await axios.patch(`/games/${currentGame.id}`, result);
            refreshGames();
            const winnerTeam = determineWinner(homeScore, awayScore, currentGame.home_team, currentGame.away_team);
            let nextGameId = Math.ceil(currentGame.id / 2) + 4;
            let isHomeTeam = currentGame.id % 2 === 1;
            await updateNextGame(nextGameId, isHomeTeam, winnerTeam.id);
        } catch (error) {
            console.error("Error updating game result: ", error);
        }
        setIsResultFormVisible(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={homeScore} onChange={e => setHomeScore(e.target.value)} />
            <input type="number" value={awayScore} onChange={e => setAwayScore(e.target.value)} />
            <input type="text" value={mvp} onChange={e => setMvp(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ResultForm;