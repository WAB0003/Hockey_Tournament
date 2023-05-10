import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Image, Input, Modal, Form } from 'semantic-ui-react'

const ViewPlayerModal = ({players, team, addPlayer}) => {
    const [open, setOpen] = React.useState(false)
    const [playerName, setPlayerName] = React.useState('');

    const displayPlayers = players.map((player)=>{
        return <p>{player.name}</p>
    });

    const handleAddPlayer = () => {
        addPlayer(playerName, team);
        setPlayerName('');
    };


    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>View Players</Button>}
        >
        <Modal.Header>{team.name}</Modal.Header>
        <Modal.Content image>
            
        <Modal.Description>
            <Header>Team Players</Header>
                {displayPlayers}
                <Form onSubmit={handleAddPlayer}>
                    <Input
                        value={playerName}
                        onChange={e => setPlayerName(e.target.value)}
                        placeholder="Player Name"
                    />
                    <Button type="submit">Add Player</Button>
                </Form>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
            Close
            </Button>
        </Modal.Actions>
        </Modal>
    )

  }
  
  export default ViewPlayerModal;

  