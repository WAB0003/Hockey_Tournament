import { Routes, Route, Switch } from "react-router-dom"
// import {createGlobalStyle} from "styled-components"
import {useEffect, useState, React} from "react"
import { TournamentProvider } from "./Games/TournamentContext";
// import Tournament from "./Games/Tournament";
import Navbar from "./Navbar";
import Teams from "./Teams/Teams";
import Players from "./Players/Players";
import Games from "./Games_bill/Games";
import Authentication from "./Authentication";

const App = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  },[])

  const fetchUser = () => {
    fetch("/authorized")
      .then(res => {
        if(res.ok) {
          res.json()
          .then(setUser)
        } else {
          setUser(null)
        }
      })
  }

  const updateUser = (user) => setUser(user)
  if (!user) return (  
    <TournamentProvider>
      <Navbar />
      <Routes>
        <Route exact path="/"/>
        <Route path="/teams" element={<Teams/>}/>
        <Route path="/players" element={<Players />}/>
        <Route path="/login" element={<Authentication updateUser={updateUser}/>}/>
      </Routes>
    </TournamentProvider>  
  )

  return (
    <TournamentProvider>
      <Navbar updateUser={updateUser}/>
      {/* <Navbar updateUser={updateUser} handleEdit={handleEdit}/> DON'T THINK WE NEED handleEdit*/}
      <Routes>
        <Route exact path="/"/>
        <Route path="/teams" element={<Teams/>}/>
        <Route path="/players" element={<Players />}/>
        <Route path="/games" element={<Games />}/>
        <Route path="/login" element={<Authentication updateUser={updateUser}/>}/>
      </Routes>
    </TournamentProvider>
  );
}

export default App;