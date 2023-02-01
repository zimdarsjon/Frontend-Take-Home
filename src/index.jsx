import React from "react";
import { createRoot } from "react-dom/client";
import { getSelectionData, postFormData } from '../controls/controller.js';
import { FormControl, Select, InputLabel, MenuItem, OutlinedInput, TextField, Button, Box, Alert, AlertTitle, Grow, Typography, Slide } from '@mui/material';

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
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
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

  return (
    <div >
      <Grow in={!submitted} direction='up' style={{ transitionDelay: '400ms' }}>
        <Typography style={{fontSize: '4em', color: '#757de8'}} variant='h1' align="center">Account Creation</Typography>
      </Grow>
      <Grow in={!submitted} style={{ transitionDelay: '800ms' }}>
        <Box sx={{
          display: submitted ? 'block' : 'none',
          p: 5,
          border: '1px solid grey',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          height: '70vh',
          width: '40%',
          justifyContent: 'space-between',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <Grow in={alert.length > 0}>
            <Alert style={{display: alert ? 'block' : 'none'}} severity="error">
              <AlertTitle>Missing Information</AlertTitle>
              {alert}
            </Alert>
          </Grow>

          <FormControl fullWidth>
            <TextField id='name' label='Full Name' variant='standard' name='name' onChange={handleChange} />
          </FormControl>

          <FormControl fullWidth>
            <TextField id='email' label='Email' variant='standard' name='email' onChange={handleChange} />
          </FormControl>

          <FormControl fullWidth>
            <TextField type='password' id='password' label='Password' name='password' variant='standard' onChange={handleChange} />
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
      </Grow>
      <Grow in={submitted} style={{ transitionDelay: '400ms' }} appear>
          <Box style={{position: 'absolute', left: '30%', top: '40vh'}}>
            <Typography style={{fontSize: '4em', color: '#757de8'}} variant='h1' align="center">User Account Created</Typography>
          </Box>
        </Grow>
    </div>
  )
}
root.render(<App />);