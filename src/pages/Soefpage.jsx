import { useEffect, useMemo } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import CustomChart from "../components/charts/CustomChart";
import CustomButton from "../components/UI/buttons/CustomButton";
import cl from "./styles/Soefpage.module.css";
import LocalDataSmoothing from "../methods/soef/LocalDataSmoothing"

function Soefpage() {

    const [func, setFunc] = useState('sin');
    const [currentFunc, setCurrentFunc] = useState(() => Math.sin);
    const [rand, setRand] = useState(0);
    const [k, setK] = useState(0);
    const [m, setM] = useState(0);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(6.5);
    const [smoothingAmount, setSmootingAmount] = useState(1);
    // const [lastData, setLastData] = useState(data);
    const [step, setStep] = useState(0.1);

    //const [datasets, setDatasets] = useState([])
    const [series, setSeries] = useState([]);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    function createSmoothedChart() {
        let smoothedGraphics = [];
        let lastData = series[series.length - 1].data;
        for (let i = 0; i < smoothingAmount; i++) {
            lastData = LocalDataSmoothing(labels, lastData, m, k);
            console.log(lastData);
            smoothedGraphics.push({
                name: `smoothed #${series.length + smoothedGraphics.length}`,
                data: lastData
            });

        }
        setSeries([...series, ...smoothedGraphics]);
    }

    useMemo(() => {
        let x = lowerBound;
        let i = 0;
        let newData = [];
        let newLabels = [];
        while (x < upperBound) {
            newData[i] = currentFunc(x);
            newLabels[i] = x.toFixed(3);
            x += step;
            i++;
        }

        for (let i = 0; i < rand; i++) {
            newData[getRandomInt(0, newData.length)] *= (Math.random() * (1 / 100) * getRandomInt(Math.floor(-rand / 2), Math.floor(rand / 2)));
        }
        setData(newData);
        setLabels(newLabels);
    }, [currentFunc, lowerBound, upperBound, rand, step]);


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

    useEffect(() => {
        setSeries([{
            name: func,
            data: data
        }])
    }, [data])

    return (
        <div className={cl.wrapper}>
            <Container>
                <div className={cl.pageTitle}>
                    <h3>Selection of empirical formulas</h3>
                </div>
                <div className={cl.pageContent}>
                    <div className={cl.settingsBlock}>
                        <div className={cl.blockTitle}>
                            <img src={require("../img/gear.png")} />
                            Settings
                        </div>

                        <div className={cl.methodSettings}>
                            <div className={cl.blockInp}>
                                <span>Randomize</span>
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
                            <div className={cl.blockInp}>
                                <span>Smoothing Amount</span>
                                <input placeholder={smoothingAmount} onChange={(e) => {
                                    setSmootingAmount(Number(e.target.value));
                                }} />
                            </div>
                            <div className={cl.blockInp}>
                                <span>Step</span>
                                <input placeholder={step} onChange={(e) => {
                                    if (Boolean(Number(e.target.value))) setStep(Number(e.target.value));
                                }} />
                            </div>
                            <CustomButton value="Build" className={cl.buildBtn} onClick={() => createSmoothedChart()} disabled={m === 0} />
                        </div>
                    </div>
                    <div className={cl.chartBlock}>
                        <CustomChart labels={labels} series={series} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Soefpage;