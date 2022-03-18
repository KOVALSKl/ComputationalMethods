import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from "uuid";
import SolveForm from './components/SolveForm';
import AnsForm from './components/AnsForm';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  const [answerCol, setAnswerCol] = useState([]);

  return (
    <div className="App">
      <Row>
          <Col xs={12} md={5}>
            <SolveForm setChanges={setAnswerCol} />
          </Col>
          <Col xs={12} md={7}>
            <AnsForm ansCol={answerCol} />
          </Col>
        </Row>
    </div>
  );
}

export default App;
