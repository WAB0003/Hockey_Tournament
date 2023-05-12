import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Button, Form } from 'semantic-ui-react'


const FinalWinner = ({winningTeam}) => {

    const [mvpPlayer, setMVPPlayer] = useState("")
    const [formData, setFormData] = useState({
        mvp_player_id: "",
        })

    // Destruction state of FormData:
    const {mvp_player_id} = formData

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
    const handleChange = (e) => {
        setFormData({...formData, 
        mvp_player_id:e.target.value,
        })
    }

    //!Create a display for each team player by mapping through team and sending to display component
    const displayPlayers = winningTeam.players.map((player)=>{
        return <option key={player.id} value={player.id}>{player.name}</option>
        })

    return(
        <>
        <h2>Winning Team: {winningTeam.name}</h2>
        <p>Choose MVP Player:</p>
        <Form key={winningTeam.id}>
            <Form.Field label='Select MVP' control='select' onChange={handleChange}>
                {displayPlayers}
            </Form.Field>
            <Button type='submit'onClick={handleMVPSubmit}>Submit MVP</Button>
        </Form>
        {mvpPlayer.length > 0 ? <h2>MVP: {mvpPlayer}</h2> : <h2></h2>}
        </>
        )
}

export default FinalWinner;