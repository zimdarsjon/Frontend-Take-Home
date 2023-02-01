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
  const [occupations, setOccupations] = useState('');
  const [states, setStates] = useState('');

  return (
    <div>
      <form>
        Form
        <Occupation />
        <State />
      </form>
    </div>
  )
}
root.render(<App />);