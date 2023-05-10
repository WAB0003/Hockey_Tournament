import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ViewPlayersModal = ({players, team}) => {
    const [open, setOpen] = React.useState(false)

    const displayPlayers = players.map((player)=> {
        return <p>{player.name}</p>
    })

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

export default ViewPlayersModal;