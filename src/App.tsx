import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
const SERVER = import.meta.env.VITE_SERVER;

fetch(SERVER)
  .then((response) => response.json())
  .then((data) => console.log(data));

function App() {
  return (
    <div>
      <p>HOLIDAYS</p>
    </div>
  );
}

export default App;
