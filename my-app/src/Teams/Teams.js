import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Container, Header } from 'semantic-ui-react'
import ModalTest from './ModalTest';


const Teams = () => {
    const [allTeams,setAllTeams]=useState([])
    
    useEffect(()=>{
        fetch("http://127.0.0.1:5555/teams")
        .then(r=>r.json())
        .then(teams=>setAllTeams(teams))
    },[])

    const displayTeams = allTeams.map((team)=>{
        return (
            <Table.Row>
                <Table.Cell>{team.id}</Table.Cell>
                <Table.Cell>{team.name}</Table.Cell>
                <Table.Cell>{team.total_points}</Table.Cell>
                <Table.Cell>{team.games_won}</Table.Cell>
                <Table.Cell>{team.home_games.length}</Table.Cell>
                <Table.Cell>{team.away_games.length}</Table.Cell>
                <Table.Cell>{<ModalTest key={team.id} team={team} players={team.players} />}</Table.Cell>
            </Table.Row>
        )
    })

    


    return(
        <div>
            <Container textAlign='center'>
                <h1 style={{paddingTop:"30px"}}>Team Roster</h1>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Team</Table.HeaderCell>
                            <Table.HeaderCell>Total Points</Table.HeaderCell>
                            <Table.HeaderCell>Games Won</Table.HeaderCell>
                            <Table.HeaderCell>Home Games</Table.HeaderCell>
                            <Table.HeaderCell>Away Games</Table.HeaderCell>
                            <Table.HeaderCell>Players</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {displayTeams}
                    </Table.Body>
                </Table>


            </Container>
        </div>
    )
}

export default Teams


