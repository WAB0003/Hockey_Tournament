import axios from "axios";
import React, { createContext, useState } from "react";

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);
    const [currentRound, setCurrentRound] = useState(1);
    const [isResultFormVisible, setIsResultFormVisible] = useState(false);

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

    const addGameResult = async (gameId, homePoints, awayPoints, mvpPlayerId, newHomeTeamId, newAwayTeamId) => {
        try {
            const response = await axios.patch(`http://localhost:5555/games/${gameId}`, {
                home_points: homePoints,
                away_points: awayPoints,
                mvp_player_id: mvpPlayerId,
                home_team_id: newHomeTeamId,
                away_team_id: newAwayTeamId
            });
            setGames(games.map(game => game.id === gameId ? response.data : game));            
        } catch (error) {
            console.error("Failed to add game result", error);
        }
    }

    const determineWinner = (homeScore, awayScore, homeTeam, awayTeam) => {
        return homeScore > awayScore ? homeTeam : awayTeam;
    }

    const updateNextGame = async (nextGameId, isHomeTeam, winnerTeamId) => {
        try {
          const response = await axios.patch(`http://localhost:5555/games/${nextGameId}`, {
            [isHomeTeam ? 'home_team_id' : 'away_team_id']: winnerTeamId
          });
          setGames(games.map(game => game.id === nextGameId ? response.data : game));            
        } catch (error) {
          console.error("Failed to update next game", error);
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
                currentGame,
                setCurrentGame,
                currentRound,
                setCurrentRound, 
                isResultFormVisible,
                setIsResultFormVisible
            }}
        >
            {children}
        </TournamentContext.Provider>
    );
};