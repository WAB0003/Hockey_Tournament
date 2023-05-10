import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import { useState } from 'react'

const AddTeamForm = () =>{

    // Create state to handle form:
    const [formData, setFormData] = useState({
        name: "",
      })

    // Destruction state of FormData:
    const {name} = formData

    //! Handle form changes
    const handleChange = (e) => {
        setFormData({...formData, 
        [e.target.name]:e.target.value,
        })
    }

    //! Handle Submit
    const handleSubmit = () => {
        
    }


    return(
        <Form>
            <Form.Field>
                <label>Team Name</label>
                <input placeholder='Enter Team Name Here' name="name" value={name} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default AddTeamForm