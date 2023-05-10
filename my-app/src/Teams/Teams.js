import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Container, Header, Button } from 'semantic-ui-react'
import ViewPlayerModal from './ViewPlayerModal';
import ViewFormModal from './ViewFormModal';


const Teams = () => {
    const [allTeams,setAllTeams]=useState([])
    
    useEffect(()=>{
        fetch("http://127.0.0.1:5555/teams")
        .then(r=>r.json())
        .then(teams=>setAllTeams(teams))
    },[])

    //!Function to handle Added Team from Form
    const handleAddTeam = (newTeam)=>{
        setAllTeams((prevTeamList)=>[...prevTeamList,newTeam])
    }

    //!Delete Team
    const deleteTeam = (team) => {
        // console.log(id)
        fetch(`http://127.0.0.1:5555/teams/${team.id}`,{
        method: "DELETE",
        })
        .then(r=>r.json())
        .then(()=>handleDeleteTeam(team))
    }
    //!Handle Delete
    const handleDeleteTeam = (deletedTeam) =>{
        const updatedTeamList = allTeams.filter((team)=>team.id !== deletedTeam.id)
        setAllTeams(updatedTeamList)
    }
    //!Handle Adding A Player to a Team
    const handleAddPlayer = (playerName, team) => {
        fetch('http://127.0.0.1:5555/players', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName, team_id: team.id }),
        })
        .then(response => response.json())
        .then(newPlayer => {
            setAllTeams(teams => teams.map(t => t.id === team.id ? {...t, players: [...t.players, newPlayer]} : t));
        })
    }

    //!Variable for displaying All Teams
    const displayTeams = allTeams.map((team)=>{
        return (
            <Table.Row>
                <Table.Cell>{team.id}</Table.Cell>
                <Table.Cell>{team.name}</Table.Cell>
                <Table.Cell>{team.total_points}</Table.Cell>
                <Table.Cell>{team.games_won}</Table.Cell>
                <Table.Cell>{team.home_games.length}</Table.Cell>
                <Table.Cell>{team.away_games.length}</Table.Cell>
                <Table.Cell>{<ViewPlayerModal key={team.id} team={team} players={team.players} addPlayer={handleAddPlayer} />}</Table.Cell>
                <Table.Cell>{<Button onClick={()=>deleteTeam(team)}>Delete Team</Button>}</Table.Cell>
            </Table.Row>
        )
    })


    return(
        <div>
            <h1 style={{paddingTop:"30px", textAlign:'center'}}>Team Roster</h1>
            <Container textAlign='center'>
                <ViewFormModal handleAddTeam={handleAddTeam} />
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
                            <Table.HeaderCell>Options</Table.HeaderCell>
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


