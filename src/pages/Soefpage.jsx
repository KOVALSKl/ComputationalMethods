import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import LineChart from "../components/charts/LineChart";
import CustomButton from "../components/UI/buttons/CustomButton";
import cl from "./styles/Soefpage.module.css";

function Soefpage() {

    const [func, setFunc] = useState('');
    const [rand, setRand] = useState(0);
    const [k, setK] = useState(0);
    const [m, setM] = useState(0);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    const state = {
        labels: labels,
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                //lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data
            }
        ]
    }

    function drawChart(func) {
        let x = 0;
        let i = 0;
        while (x < 5) {
            data[i] = func(x);
            labels[i] = x;
            x += 0.1;
            i++;
        }
        console.log(data);
        setData(data);
        //state.datasets.data = data;
    }


    useEffect(() => {
        switch (func) {
            case "sin":
                drawChart(Math.sin);
            case "cos":
                drawChart(Math.cos);
            case "sqrt":
                drawChart(Math.sqrt);
        }
    }, [func]);

    return (
        <div className={cl.wrapper}>
            <Container>
                <div className={cl.pageTitle}>
                    <h3>Selection of empirical formulas</h3>
                </div>
                <div className={cl.pageContent}>
                    <div className={cl.methodSettings}>
                        <div className={cl.funcSelect}>
                            <span>function:</span>
                            <select onChange={(e) => {
                                setFunc(e.target.value);
                            }}>
                                <option>sin</option>
                                <option>cos</option>
                                <option>sqrt</option>
                            </select>
                        </div>
                        <div className={cl.blockInp}>
                            <span>randomize</span>
                            <input placeholder={rand} onChange={(e) => {
                                setRand(Number(e.target.value));
                            }} />
                        </div>
                        <div className={cl.blockInp}>
                            <span>m</span>
                            <input placeholder={m} onChange={(e) => {
                                setM(Number(e.target.value));
                            }} />
                        </div>
                        <div className={cl.blockInp}>
                            <span>k</span>
                            <input placeholder={k} onChange={(e) => {
                                setK(Number(e.target.value));
                            }} />
                        </div>
                        {/* <CustomButton
                            value="build"
                            className={cl.buildBtn}
                            disabled={ (k === 0 || m === 0) } 
                            /> */}
                    </div>
                    <LineChart chartData={state} />
                </div>
            </Container>
        </div>
    );
}

export default Soefpage;