import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Container, Header, Button, Grid, Form, Input } from 'semantic-ui-react'
import FinalWinner from './FinalWinner';

const Games = ({allTeams, setAllTeams, allGames, setAllGames}) => {
    const[winningTeam,setWinningTeam]=useState([])
    
    

    //!HANDLE GAME 1 RESULTS
    const [Game1Data, setGame1Data] = useState({
        home_points: "",
        away_points: "",
      })

    const handleGame1Change = (e) => {
        setGame1Data({...Game1Data, 
        [e.target.name]:e.target.value,
        })
    }

    const handleGame1Submit = () => {
        //Create new team object that pull information from formData
        const game1Objupate = {
            home_points:Game1Data.home_points,
            away_points:Game1Data.away_points
          }
        //   console.log(game1Objupate)

          fetch ("/games/1", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game1Objupate)
          })
          .then((r)=>r.json())
          .then(game1_object=>handleGame5hometeam(game1_object))
    }

    //* FIGURES OUT GAME 5 HOME TEAM FROM GAME 1
    const handleGame5hometeam = (game1_object)=>{
        
        let game5home_team = {}
        if (game1_object.home_points>game1_object.away_points){
            game5home_team = {home_team_id : game1_object.home_team.id}
        } else {
            game5home_team = {home_team_id : game1_object.away_team.id}
        }
        // console.log(game5home_team)
        // debugger
        fetch ("/games/5", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game5home_team)
          })
          .then((r)=>r.json())
          .then(game5_object=>handleGameDisplay(game5_object))
    }

    //!HANDLE GAME 2 RESULTS
    const [Game2Data, setGame2Data] = useState({
        home_points: "",
        away_points: "",
    })

    const handleGame2Change = (e) => {
        setGame2Data({...Game2Data, 
        [e.target.name]:e.target.value,
        })
    }

    const handleGame2Submit = () => {
        //Create new team object that pull information from formData
        const game2Objupate = {
            home_points:Game2Data.home_points,
            away_points:Game2Data.away_points
          }
        //   console.log(game2Objupate)

          fetch ("/games/2", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game2Objupate)
          })
          .then((r)=>r.json())
          .then(game2_object=>handleGame5awayteam(game2_object))
    }

    //* FIGURES OUT GAME 5 AWAY TEAM FROM GAME 1
    const handleGame5awayteam = (game2_object)=>{
        let game5away_team = {}
        if (game2_object.home_points>game2_object.away_points){
            game5away_team = {away_team_id : game2_object.home_team.id}
        } else {
            game5away_team = {away_team_id : game2_object.away_team.id}
        }
        // console.log(game5home_team)
        // debugger
        fetch ("/games/5", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game5away_team)
          })
          .then((r)=>r.json())
          .then(game5_object=>handleGameDisplay(game5_object))
    }
    
    //!HANDLE GAME 3 RESULTS
    const [Game3Data, setGame3Data] = useState({
        home_points: "",
        away_points: "",
    })

    const handleGame3Change = (e) => {
        setGame3Data({...Game3Data, 
        [e.target.name]:e.target.value,
        })
    }

    const handleGame3Submit = () => {
        //Create new team object that pull information from formData
        const game3Objupate = {
            home_points:Game3Data.home_points,
            away_points:Game3Data.away_points
          }
        //   console.log(game2Objupate)

          fetch ("/games/3", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game3Objupate)
          })
          .then((r)=>r.json())
          .then(game3_object=>handleGame6hometeam(game3_object))
    }

    //* FIGURES OUT GAME 6 HOME TEAM FROM GAME 1
    const handleGame6hometeam = (game3_object)=>{
        
        let game6home_team = {}
        if (game3_object.home_points>game3_object.away_points){
            game6home_team = {home_team_id : game3_object.home_team.id}
        } else {
            game6home_team = {home_team_id : game3_object.away_team.id}
        }
        // debugger
        fetch ("/games/6", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game6home_team)
          })
          .then((r)=>r.json())
          .then(game6_object=>handleGameDisplay(game6_object))
    }

    //!HANDLE GAME 4 RESULTS
    const [Game4Data, setGame4Data] = useState({
        home_points: "",
        away_points: "",
    })

    const handleGame4Change = (e) => {
        setGame4Data({...Game4Data, 
        [e.target.name]:e.target.value,
        })
    }

    const handleGame4Submit = () => {
        //Create new team object that pull information from formData
        const game4Objupate = {
            home_points:Game4Data.home_points,
            away_points:Game4Data.away_points
          }


          fetch ("/games/4", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game4Objupate)
          })
          .then((r)=>r.json())
          .then(game4_object=>handleGame6awayteam(game4_object))
    }

    //* FIGURES OUT GAME 6 AWAY TEAM FROM GAME 1
    const handleGame6awayteam = (game4_object)=>{
        let game6away_team = {}
        if (game4_object.home_points>game4_object.away_points){
            game6away_team = {away_team_id : game4_object.home_team.id}
        } else {
            game6away_team = {away_team_id : game4_object.away_team.id}
        }

        fetch ("/games/6", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game6away_team)
          })
          .then((r)=>r.json())
          .then(game6_object=>handleGameDisplay(game6_object))
    }
    
    //!HANDLE GAME 5 RESULTS
    const [Game5Data, setGame5Data] = useState({
        home_points: "",
        away_points: "",
      })

    const handleGame5Change = (e) => {
        setGame5Data({...Game5Data, 
        [e.target.name]:e.target.value,
        })
    }

    const handleGame5Submit = () => {
        //Create new team object that pull information from formData
        const game5Objupate = {
            home_points:Game5Data.home_points,
            away_points:Game5Data.away_points
          }
        //   console.log(game5Objupate)

          fetch ("/games/5", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game5Objupate)
          })
          .then((r)=>r.json())
          .then(game5_object=>handleFINALhometeam(game5_object))
    }

    //* FIGURES OUT FINAL HOME TEAM FROM GAME 5
    const handleFINALhometeam = (game5_object)=>{
        
        let finalGamehome_team = {}
        if (game5_object.home_points>game5_object.away_points){
            finalGamehome_team = {home_team_id : game5_object.home_team.id}
        } else {
            finalGamehome_team = {home_team_id : game5_object.away_team.id}
        }

        fetch ("/games/7", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(finalGamehome_team)
          })
          .then((r)=>r.json())
          .then(finalGame_object=>handleGameDisplay(finalGame_object))
    }

    //!HANDLE GAME 6 RESULTS
    const [Game6Data, setGame6Data] = useState({
        home_points: "",
        away_points: "",
    })

    const handleGame6Change = (e) => {
        setGame6Data({...Game6Data, 
        [e.target.name]:e.target.value,
        })
    }

    const handleGame6Submit = () => {
        //Create new team object that pull information from formData
        const game6Objupate = {
            home_points:Game6Data.home_points,
            away_points:Game6Data.away_points
          }


          fetch ("/games/6", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(game6Objupate)
          })
          .then((r)=>r.json())
          .then(game6_object=>handleFINALawayteam(game6_object))
    }

    //* FIGURES OUT FINAL AWAY TEAM FROM GAME 6
    const handleFINALawayteam = (game6_object)=>{
        let finalGameaway_team = {}
        if (game6_object.home_points>game6_object.away_points){
            finalGameaway_team = {away_team_id : game6_object.home_team.id}
        } else {
            finalGameaway_team = {away_team_id : game6_object.away_team.id}
        }
        // console.log(game5home_team)
        // debugger
        fetch ("/games/7", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(finalGameaway_team)
          })
          .then((r)=>r.json())
          .then(finalGame_object=>handleGameDisplay(finalGame_object))
    }

    //!HANDLE FINAL GAME RESULTS
    const [finalGameData, setfinalGameData] = useState({
        home_points: "",
        away_points: "",
    })

    const handleFinalChange = (e) => {
        setfinalGameData({...finalGameData, 
        [e.target.name]:e.target.value,
        })
    }

    const handleFinalSubmit = () => {
        //Create new team object that pull information from formData
        const finalGameObjupate = {
            home_points:finalGameData.home_points,
            away_points:finalGameData.away_points
          }


          fetch ("/games/7", {
              method: "PATCH",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(finalGameObjupate)
          })
          .then((r)=>r.json())
          .then(finalGame_object=>handleFINALWinner(finalGame_object))
    }

    //* FIGURES OUT Winner of Final Game
    const handleFINALWinner = (finalGame_object)=>{
        // console.log(finalGame_object)
        let winningTeamID
        
        if (finalGame_object.home_points>finalGame_object.away_points){
            winningTeamID = finalGame_object.home_team.id
            // console.log(winningTeamID)
            fetch(`/teams/${winningTeamID}`)
            .then(r=>r.json())
            .then(team=>setWinningTeam(team))
            

            //Fetch Winning Team:
            // setWinningTeam(winningTeamObj)

        } else {
            winningTeamID = finalGame_object.away_team.id
            // console.log(winningTeamID)
            fetch(`/teams/${winningTeamID}`)
            .then(r=>r.json())
            .then(team=>setWinningTeam(team))
            // setWinningTeam(winningTeamObj)

        }
        // console.log(winningTeam.name)
        // console.log(game5home_team)
        // debugger
        
    }

    console.log(Object.keys(winningTeam).length)



    //!Function for handling all game displayed in tournament
    const handleGameDisplay = (game_obj)=>{
        const updatedGames = allGames.map((game)=>{
          if(game.id===game_obj.id) {
            return game_obj;
          } else {
            return game;
          }
        })
        setAllGames(()=>updatedGames)
       }

    if (allTeams.length === 9){
    return(
        <div>
        <h1>Bracket</h1>
        <Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column>
                    <h2>Game 1</h2>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[0].home_team.name }</label>
                            <input placeholder='Enter Score' name="home_points" value={Game1Data.home_points} onChange={handleGame1Change}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[0].away_team.name }</label>
                            <input placeholder='Enter Score' name="away_points" value={Game1Data.away_points} onChange={handleGame1Change}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleGame1Submit}>Submit Game 1</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <h2>Game 2</h2>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[1].home_team.name}</label>
                            <input placeholder='Enter Score' name="home_points" value={Game2Data.home_points} onChange={handleGame2Change}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[1].away_team.name}</label>
                            <input placeholder='Enter Score' name="away_points" value={Game2Data.away_points} onChange={handleGame2Change}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleGame2Submit}>Submit Game 2</Button>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <h1>Game 5</h1>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[4].home_team.name}</label>
                            <input placeholder='Enter Score' name="home_points" value={Game5Data.home_points} onChange={handleGame5Change}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[4].away_team.name}</label>
                            <input placeholder='Enter Score' name="away_points" value={Game5Data.away_points} onChange={handleGame5Change}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleGame5Submit}>Submit Game 5</Button>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <h1>FINAL</h1>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[6].home_team.name}</label>
                            <input placeholder='Enter Score' name="home_points" value={finalGameData.home_points} onChange={handleFinalChange}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[6].away_team.name}</label>
                            <input placeholder='Enter Score' name="away_points" value={finalGameData.away_points} onChange={handleFinalChange}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleFinalSubmit}>Submit Final</Button>
                    </Form>
                    {Object.keys(winningTeam).length>0 ? <FinalWinner winningTeam={winningTeam}/> : <h1></h1> }
                    {/* <FinalWinner winningTeam={winningTeam}/> */}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <h2>Game 3</h2>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[2].home_team.name}</label>
                            <input placeholder='Enter Score' name="home_points" value={Game3Data.home_points} onChange={handleGame3Change}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[2].away_team.name}</label>
                            <input placeholder='Enter Score' name="away_points" value={Game3Data.away_points} onChange={handleGame3Change}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleGame3Submit}>Submit Game 3</Button>
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <h1>Game 6</h1>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[5].home_team.name }</label>
                            <input placeholder='Enter Score' name="home_points" value={Game6Data.home_points} onChange={handleGame6Change}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[5].away_team.name }</label>
                            <input placeholder='Enter Score' name="away_points" value={Game6Data.away_points} onChange={handleGame6Change}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleGame6Submit}>Submit Game 6</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <h2>Game 4</h2>
                    <Form>
                        <Form.Field inline>
                            <label>{allGames[3].home_team.name}</label>
                            <input placeholder='Enter Score' name="home_points" value={Game4Data.home_points} onChange={handleGame4Change}></input>
                        </Form.Field>
                        <Form.Field inline>
                            <label>{allGames[3].away_team.name}</label>
                            <input placeholder='Enter Score' name="away_points" value={Game4Data.away_points} onChange={handleGame4Change}></input>
                        </Form.Field>
                        <Button type='submit'onClick={handleGame4Submit}>Submit Game 4</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </div>
    )
} else {
    return <h1>There Can Only Be 8 Teams</h1>
}
}

export default Games;





