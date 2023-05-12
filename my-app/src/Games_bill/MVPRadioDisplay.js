import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Radio, Container, Header, Button, Form, Input } from 'semantic-ui-react'

const MVPRadioDisplay = ({player, formData, setFormData}) => {
    //! Handle form changes
    // Destruction state of FormData:
    const {mvp_player_id} = formData
   

    const handleChange = (e) => {
        setFormData({...formData, 
        mvp_player_id:e.target.value,
        })
    }


    let value
    // const handleChange = (e, { value }) => this.setState({ value })
    

    return(
        // <Form.Field
        //         control={Radio}
        //         label={player.name}
        //         value={player.name}
        //         checked={value === player.id}
        //         onChange={handleChange}
        //     />
            <Form.Field
            label={player.name}
            control='input'
            value={player.id}
            type='radio'
            // checked={value === player.id}
            name={player.id}
            onChange={handleChange}
          />
    )

}

export default MVPRadioDisplay;