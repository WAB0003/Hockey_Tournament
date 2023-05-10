import React, { useEffect } from "react";
import { useContext } from "react";
import { TournamentContext } from "./TournamentContext";
import Bracket from "./Bracket";
import ResultForm from "./ResultForm";

const Tournament = () => {
    const { getTeams, getGames } = useContext(TournamentContext);
    const { isResultFormVisible } = useContext(TournamentContext);

    useEffect(() => {
        getTeams();
        getGames();
    }, []);

    return (
        <>
            <h1>Hello Tournament</h1>
            <Bracket />
            {isResultFormVisible && <ResultForm />}
        </>
    )
}

export default Tournament;