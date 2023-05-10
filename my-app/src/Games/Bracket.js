import React, { useContext } from "react";
import OneGame from "./OneGame";
import { TournamentContext } from "./TournamentContext";

const Bracket = () => {
  const { games, currentRound } = useContext(TournamentContext);

  return (
    <div className="bracket">
      {games.filter(game => {
        if (currentRound === 1) {
          return game.id <= 4;
        } else if (currentRound === 2) {
          return game.id > 4 && game.id <=6;
        } else if (currentRound === 3) {
          return game.id > 6;
        }
      }).map(game => (
        <OneGame key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Bracket;