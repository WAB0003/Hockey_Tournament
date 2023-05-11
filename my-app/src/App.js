import React , {useState, useEffect}  from "react";
import { Routes, Route } from "react-router-dom"
import { TournamentProvider } from "./Games/TournamentContext";
// import Tournament from "./Games/Tournament";
import Navbar from "./Navbar";

import Teams from "./Teams/Teams";
import Players from "./Players/Players";
import Games from "./Games_bill/Games";


const App = () => {

  const [allTeams,setAllTeams]=useState([])
  const [allGames,setAllGames]=useState([])
  // console.log(allGames[4].home_team)


  //*Get All Games
  useEffect(()=>{
      fetch("http://127.0.0.1:5555/games")
      .then(r=>r.json())
      .then(games=>setAllGames(games))
  },[])
  
  //*Get All Teams
  useEffect(()=>{
      fetch("http://127.0.0.1:5555/teams")
      .then(r=>r.json())
      .then(teams=>setAllTeams(teams))
  },[])


  return (
    <TournamentProvider>
      <Navbar />
      <Routes>
        <Route exact path="/"/>
        <Route path="/teams" element={<Teams/>}/>
        <Route path="/players" element={<Players />}/>
        <Route path="/games" element={<Games allTeams={allTeams} setAllTeams={setAllTeams} allGames={allGames} setAllGames={setAllGames}/>}/>
        
      </Routes>
    </TournamentProvider>
  );
}

export default App;



// import Navbar from "./Navbar"
// import "./App.css"
// function App() {
//   return (
//     <div>
//       <Navbar />
//       <div className="tree">
//         <ul>
//           <li>
//             <a href="#">Parent</a>
//             <ul>
//               <li>
//                 <a href="#">Child</a>
//                 <ul>
//                   <li>
//                     <a href="#">Grand child</a>
//                     <ul>
//                       <li>
//                         <a href="#">Great Grand Child</a>
//                       </li>
//                       <ul>
//                       <li>
//                         <a href="#">Great Grand Child</a>
//                       </li>
//                       <ul>
//                       <li>
//                         <a href="#">Great Grand Child</a>
//                       </li>
//                     </ul>
//                     </ul>
//                     </ul>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
