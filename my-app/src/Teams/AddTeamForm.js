import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import { useState } from 'react'

const AddTeamForm = ({handleAddTeam}) =>{

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
        //Create new team object that pull information from formData
        const newTeamObj = {
            name: name,
          }
        
        //add team to database
        fetch("http://127.0.0.1:5555/teams", {
            method: "POST",
            headers: {
              "Content-Type":"application/json",
            },
            body:JSON.stringify(newTeamObj)
          })
          .then((r)=>r.json())
          .then((newTeam)=>{
            handleAddTeam(newTeam)
          } )

        //Reset Form
        setFormData({
            name:"",
        })

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