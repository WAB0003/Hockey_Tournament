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

    return (
        <>
            <h1>Hello Tournament</h1>
            <Bracket />
        </>
    )
}

export default Tournament;