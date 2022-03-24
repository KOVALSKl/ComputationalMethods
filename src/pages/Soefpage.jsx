import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import LineChart from "../components/charts/LineChart";
import CustomButton from "../components/UI/buttons/CustomButton";
import cl from "./styles/Soefpage.module.css";
import LeastSquareMethod from "../methods/soef/LeastSquareMethod";
import LocalDataSmoothing from "../methods/soef/LocalDataSmoothing"
import { useRef } from "react";
import { createRef } from "react";

function Soefpage() {

    const [func, setFunc] = useState('sin');
    const [currentFunc, setCurrentFunc] = useState(() => Math.sin);
    const [rand, setRand] = useState(0);
    const [k, setK] = useState(0);
    const [m, setM] = useState(0);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(5);

    // const [chartOptions, setChartOptinos] = useState({
    //     labels: labels,
    //     datasets: [
    //         {
    //             label: func,
    //             fill: false,
    //             lineTension: 0.4,
    //             backgroundColor: 'rgba(75,192,192,1)',
    //             borderColor: "rgba(0, 0, 0, 1)",
    //             borderWidth: 2,
    //             data: data
    //         },
    //     ],
    // });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomColor() {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    function createSmoothedChart() {
        let newDataForChart = LocalDataSmoothing(labels, data, m, k);
        let smoothedChart = {
            label: func + "1",
            fill: false,
            lineTension: 0.4,
            backgroundColor: getRandomColor(),
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 2,
            data: newDataForChart
        }
        setData(newDataForChart);
        //console.log(state.datasets);
    }

    const state = {
        labels: labels,
        datasets: [
            {
                label: func,
                fill: false,
                lineTension: 0.4,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 2,
                data: data
            },
        ],
    }

    useEffect(() => {
        let x = lowerBound;
        let i = 0;
        let newData = [];
        let newLabels = [];
        while (x < upperBound) {
            newData[i] = currentFunc(x);
            newLabels[i] = x.toFixed(3);
            x += 0.1;
            i++;
        }

        for(let i = 0; i < rand; i++) {
            newData[getRandomInt(0, newData.length)] *= (Math.random() * getRandomInt(Math.floor(-rand / 2), Math.floor(rand / 2))); 
        }
        setData(newData);
        setLabels(newLabels);
    }, [currentFunc, lowerBound, upperBound, rand]);


    useEffect(() => {
        switch (func) {
            case "sin":
                setCurrentFunc(() => Math.sin);
                break;
            case "cos":
                setCurrentFunc(() => Math.cos);
                break;
            case "sqrt":
                setCurrentFunc(() => Math.sqrt);
                break;
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
                        <div className={cl.blockInp}>
                            <span>Lower Bound</span>
                            <input placeholder={lowerBound} onChange={(e) => {
                                setLowerBound(Number(e.target.value));
                            }} />
                        </div>
                        <div className={cl.blockInp}>
                            <span>Upper Bound</span>
                            <input placeholder={upperBound} onChange={(e) => {
                                setUpperBound(Number(e.target.value));
                            }} />
                        </div>
                        <CustomButton value="Build" className={cl.buildBtn} onClick={() => createSmoothedChart()} disabled={k === 0 || m === 0}/>
                    </div>
                    <LineChart chartData={state} />
                </div>
            </Container>
        </div>
    );
}

export default Soefpage;