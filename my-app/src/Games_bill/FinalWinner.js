import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Radio, Container, Header, Button, Form, Input } from 'semantic-ui-react'
import MVPRadioDisplay from './MVPRadioDisplay';

const FinalWinner = ({winningTeam}) => {
    console.log(winningTeam.players)
    const [mvpPlayer, setMVPPlayer] = useState("")

    console.log(mvpPlayer.length)

    

    // Create state to handle form:
    const [formData, setFormData] = useState({
        mvp_player_id: "",
        })

    // Destruction state of FormData:
    const {mvp_player_id} = formData

    console.log(formData)
    





    //! Handle Submit
    const handleMVPSubmit = () => {
        //create object for updated game
        const newGameUpdate = {
            mvp_player_id: mvp_player_id,
            }
        
        //update game in database
        fetch("/games/7", {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newGameUpdate)
            })
            .then((r)=>r.json())
            .then((updatedGame)=>{
            console.log(updatedGame)
            setMVPPlayer(updatedGame.mvp_player.name)
            } )
        }

    //!Create a display for each team player by mapping through team and sending to display component
    const displayPlayers = winningTeam.players.map((player)=>{
            return(<MVPRadioDisplay key={player.id} player={player} formData={formData} setFormData={setFormData} />)
        })

    
    


    return(
        <>
        <h2>Winning Team: {winningTeam.name}</h2>
        <p>Choose MVP Player:</p>
        <Form key={winningTeam.id}>
            {displayPlayers}
            <Button type='submit'onClick={handleMVPSubmit}>Submit MVP</Button>
        </Form>
        {mvpPlayer.length > 0 ? <h2>MVP: {mvpPlayer}</h2> : <h2></h2>}

           
        
        </>
        )
}

export default FinalWinner;