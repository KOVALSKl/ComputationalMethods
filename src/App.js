import React, { useState } from 'react';
import cl from './App.css';
import { v4 as uuidv4 } from "uuid";
import MatrixGrid from './components/MatrixGrid';
import SolveForm from './components/SolveForm';

function App() {

  const [cells, setCells] = useState([
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
    {id: uuidv4()},
  ]);

  return (
    <div className="App">
      <SolveForm cells={cells}/>
    </div>
  );
}

export default App;
