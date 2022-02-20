import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from "uuid";
import SolveForm from './components/SolveForm';
import AnsForm from './components/AnsForm';

function App() {

  const [answerCol, setAnswerCol] = useState([]);
  
  return (
    <div className="App">
      <SolveForm setChanges={setAnswerCol} />
      <AnsForm ansCol={answerCol} />
    </div>
  );
}

export default App;
