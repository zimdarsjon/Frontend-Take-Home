import React from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

const { useState, useEffect } = React;

const App = () => {

  return (
    <h1>Hellow World</h1>
  )
}
root.render(<App />);