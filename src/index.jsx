import React from "react";
import { createRoot } from "react-dom/client";
import { getSelectionData, postFormData } from '../controls/controller.js';
import { FormControl, Select, InputLabel, MenuItem, OutlinedInput, TextField, Button, Box, Alert, AlertTitle } from '@mui/material';

const root = createRoot(document.getElementById("root"));

const { useState, useEffect } = React;

const App = () => {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: ''
  })
  const [stateOptions, setStateOptions] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [alert, setAlert] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getSelectionData()
      .then(res => {
        setOccupationOptions(res.data.occupations);
        setStateOptions(res.data.states);
      })
  }, [])

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value})
  }

  const submit = () => {
    let missingFields = [];
    Object.keys(formFields).forEach(field => {
      if (!formFields[field]) {
        missingFields.push(field)
      }
    })
    setAlert(missingFields.join(', '));
    if (missingFields.length === 0) {
      postFormData(formFields)
        .then(() => setSubmitted(true))
    }
  }

  if (submitted) {
    return <h1>Complete</h1>
  }

  return (
    <div>
      <Box>
      {alert &&
      <Alert severity="error">
        <AlertTitle>Missing Information</AlertTitle>
        {alert}
      </Alert>
      }

     <FormControl fullWidth>
      <TextField id='name' label='Full Name' variant='standard' name='name' onChange={handleChange}/>
     </FormControl>

     <FormControl fullWidth>
      <TextField id='email' label='Email' variant='standard' name='email' onChange={handleChange}/>
     </FormControl>

     <FormControl fullWidth>
      <TextField type='password' id='password' label='Password' name='password' variant='standard' onChange={handleChange}/>
     </FormControl>

      <FormControl fullWidth>
        <InputLabel id='occupation-label'>Occupation</InputLabel>
        <Select
          labelId='occupation-label'
          id='occupations'
          input={<OutlinedInput label='Occupation' />}
          value={formFields.occupation}
          onChange={handleChange}
          name='occupation'
        >
          {occupationOptions.map(occupation => {
            return <MenuItem key={occupation} value={occupation}>{occupation}</MenuItem>
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='state-label'>State</InputLabel>
        <Select
          labelId='state-label'
          id='states'
          input={<OutlinedInput label='State' />}
          value={formFields.state}
          onChange={handleChange}
          name='state'
          >
          {stateOptions.map(state => {
            return <MenuItem key={state.abbreviation} value={state.name}>{state.abbreviation}</MenuItem>
          })}
        </Select>
      </FormControl>

      <Button onClick={submit}>Submit</Button>
      </Box>
    </div>
  )
}
root.render(<App />);