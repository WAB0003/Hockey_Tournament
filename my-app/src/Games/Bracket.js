import React, { useContext } from "react";
import OneGame from "./OneGame";
import { TournamentContext } from "./TournamentContext";

const Bracket = () => {
  const { games } = useContext(TournamentContext);

  return (
    <div className="bracket">
      {games.map(game => (
        <OneGame key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Bracket;


/* <div className="tree">
<ul>
  <li>
    <a href="#">Parent</a>
    <ul>
      <li>
        <a href="#">Child</a>
        <ul>
          <li>
            <a href="#">Grand child</a>
            <ul>
              <li>
                <a href="#">Great Grand Child</a>
              </li>
              <ul>
              <li>
                <a href="#">Great Grand Child</a>
              </li>
              <ul>
              <li>
                <a href="#">Great Grand Child</a>
              </li>
            </ul>
            </ul>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
</div> */