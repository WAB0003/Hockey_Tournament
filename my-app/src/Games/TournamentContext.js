import axios from "axios";
import React, { createContext, useState } from "react";

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [currentRound, setCurrentRound] = useState(1);

    const getTeams = async () => {
        try {
            const response = await axios.get('http://localhost:5555/teams');
            setTeams(response.data);
        } catch (error) {
            console.error("Failed to fetch teams", error);
        }
    }

    const getGames = async () => {
        try {
            const response = await axios.get("http://localhost:5555/games");
            setGames(response.data);
        } catch (error) {
            console.error("failed to fetch games", error);
        }
    }

    const addGameResult = async (gameId, homePoints, awayPoints, mvpPlayerId) => {
        try {
            const response = await axios.patch("http://localhost:5555/games/${gameId}", {
                home_points: homePoints,
                away_points: awayPoints,
                mvp_player_id: mvpPlayerId,
            });
            setGames(games.map(game => game.id === gameId ? response.data : game));            
        } catch (error) {
            console.error("Failed to add game result", error);
        }
    }

    return (
        <TournamentContext.Provider
            value={{
                games,
                teams,
                getTeams,
                getGames,
                addGameResult,
                currentRound,
                setCurrentRound
            }}
        >
            {children}
        </TournamentContext.Provider>
    );
};