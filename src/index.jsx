import React from "react";
import { createRoot } from "react-dom/client";
import { getSelectionData, postFormData } from '../controls/controller.js';
import Occupation from './inputs/Occupation.jsx';
import State from './inputs/State.jsx';

const root = createRoot(document.getElementById("root"));

const { useState, useEffect } = React;

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [state, setState] = useState('');
  const [stateOptions, setStateOptions] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);

  useEffect(() => {
    getSelectionData()
      .then(res => {
        setOccupationOptions(res.data.occupations);
        setStateOptions(res.data.states);
      })
  }, [])

  return (
    <div>
      <form>
        <label htmlFor='occupations'>Choose an occupation:</label>
        <select name='occupations' id='occupations' defaultValue='none'>
          <option value='none' disabled hidden>Select an Option</option>
          {occupationOptions.map(option => {
            return <option key={option} value={option}>{option}</option>
          })}
        </select>
      </form>
    </div>
  )
}
root.render(<App />);