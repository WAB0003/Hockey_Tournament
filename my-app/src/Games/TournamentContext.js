import React, { createContext, useState } from "react";

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);

    const getTeams = async () => {
        // We'll need to get team data
        // We'll need to setTeams()
    }

    const getGames = async () => {
        // Similarly, we'll need to get game data
        // and then setGames()
    }

    const addGameResult = async (gameId, homePoints, awayPoints, mvpPlayerId) => {
        // Use API to update the game result
        // Then update the local state
        // let updatedGames = [...games];
        // let game = updatedGames.find(game => game.id === gameId);
        // game.home_points = homePoints;
        // game.away_points = awayPoints;
        // game.mvp_player_id = mvpPlayerId;
        // setGames(updatedGames);
    }

    return (
        <TournamentContext.Provider
            value={{
                games,
                teams,
                getTeams,
                getGames,
                addGameResult,
            }}
        >
            {children}
        </TournamentContext.Provider>
    );
};