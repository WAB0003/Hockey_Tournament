import React , {useState, useEffect}  from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Table, Radio, Container, Header, Button, Form, Input } from 'semantic-ui-react'

const MVPRadioDisplay = ({player, formData, setFormData}) => {

    return <option key={player.id} value={player.id}>{player.name}</option>
}

export default MVPRadioDisplay;