import React from "react";
import { createRoot } from "react-dom/client";
import { getSelectionData, postFormData } from '../controls/controller.js';

const root = createRoot(document.getElementById("root"));

const { useState, useEffect } = React;

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [state, setState = useState('')];

  return (
    <div>
      <form>
        Form
      </form>
    </div>
  )
}
root.render(<App />);