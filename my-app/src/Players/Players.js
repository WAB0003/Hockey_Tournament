import React, {useState, useEffect} from 'react';
import { Table, Container, Header, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ViewPlayersModal from './ViewPlayersModal';

const Players = () => {
   const [allPlayers, setAllPlayers]=useState([])

   useEffect(()=>{
    fetch("http://127.0.0.1:5555/players")
    .then(r=>r.json())
    .then(players=>setAllPlayers(players))
    },[])

    const displayPlayers = allPlayers.map((player)=>{
        return (
            <Table.Row>
                <Table.Cell>{player.id}</Table.Cell>
                <Table.Cell>{player.name}</Table.Cell>
                <Table.Cell>{player.total_points}</Table.Cell>
                <Table.Cell>{player.times_mvp}</Table.Cell>
                <Table.Cell>{player.player_ranking}</Table.Cell>
                <Table.Cell>{player.team_id}</Table.Cell>
                <Table.Cell>{player.team}</Table.Cell>
                <Table.Cell>{player.mvp_games.length}</Table.Cell>
            </Table.Row>
        )
    })

    return(
        <div>
            <h1 style={{paddingTop:"30px", textAlign:'center'}}>Players</h1>
                <Container textAlign='center'>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Team</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Times MVP</Table.HeaderCell>
                                <Table.HeaderCell>Player Ranking</Table.HeaderCell>
                                <Table.HeaderCell>Team #</Table.HeaderCell>
                                <Table.HeaderCell>Total Points</Table.HeaderCell>
                                <Table.HeaderCell>MVP Games</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {displayPlayers}
                        </Table.Body>
                    </Table>


                </Container>
        </div>
    )

}
export default Players