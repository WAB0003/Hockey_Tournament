import React, { useEffect } from "react";
import { useContext } from "react";
import { TournamentContext } from "./TournamentContext";
import Bracket from "./Bracket";

const Tournament = () => {
    const { getTeams, getGames } = useContext(TournamentContext);

    useEffect(() => {
        getTeams();
        getGames();
    }, []);

    return <Bracket />;
}

export default Tournament;