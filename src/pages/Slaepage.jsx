import React, { useState } from 'react';
import cl from './styles/Slaepage.module.css';
import SolveForm from '../components/SolveForm';
import AnsForm from '../components/AnsForm';
import { Row, Col } from 'react-bootstrap';

function Slaepage() {

    const [answerCol, setAnswerCol] = useState([]);

    return (
        <div className={cl.wrapper}>
            <Row style={{height: "100%"}}>
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

export default Slaepage;
