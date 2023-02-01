import React from "react";
import { createRoot } from "react-dom/client";
import { getSelectionData, postFormData } from '../controls/controller.js';

const root = createRoot(document.getElementById("root"));

const { useState, useEffect } = React;

const App = () => {

  return (
    <div>
      <form>
        Form
      </form>
    </div>
  )
}
root.render(<App />);