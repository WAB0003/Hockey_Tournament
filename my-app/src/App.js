import React from "react";
import { TournamentProvider } from "./Games/TournamentContext";
import Tournament from "./Games/Tournament";
import Navbar from "./Navbar";

const App = () => {
  return (
    <TournamentProvider>
      <Navbar />
      <Tournament />
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
