import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import AddTeamForm from './AddTeamForm'

const ViewFormModal = ({handleAddTeam}) => {
    const [open, setOpen] = React.useState(false)

    

    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Add Team</Button>}
        >
            <Modal.Header>Team Name</Modal.Header>
            <Modal.Content image>
                
                <Modal.Description>
                    <Header>Add Team Form</Header>
                    <AddTeamForm handleAddTeam = {handleAddTeam}/>
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
  
  export default ViewFormModal;