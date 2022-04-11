import { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import CustomChart from "../components/charts/CustomChart";
import CustomButton from "../components/UI/buttons/CustomButton";
import { CSSTransition, Transition } from "react-transition-group";
import cl from "./styles/Soefpage.module.css";
import "./styles/style.css";
import LocalDataSmoothing from "../methods/soef/LocalDataSmoothing";
import MatrixGrid from "../components/MatrixGrid";
import { v4 as uuidv4 } from "uuid";
import { SnackbarProvider } from "notistack";
import Fade from "@material-ui/core/Fade";

function Soefpage() {
  const providerRef = useRef();

  const [func, setFunc] = useState("sin");
  const [currentFunc, setCurrentFunc] = useState(() => Math.sin);
  const [rand, setRand] = useState(0);
  const [k, setK] = useState(0);
  const [m, setM] = useState(0);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(6.5);
  const [smoothingAmount, setSmootingAmount] = useState(1);
  const [step, setStep] = useState(0.1);
  const [isTableVsb, setIsTableVsb] = useState(false);
  // const [randoms, setRandoms] = useState([]);
  const [x, setX] = useState([
    // { value: -3, id: uuidv4() },
    // { value: -2, id: uuidv4() },
    // { value: -1, id: uuidv4() },
    // { value: 0, id: uuidv4() },
    // { value: 1, id: uuidv4() },
    // { value: 2, id: uuidv4() },
    // { value: 3, id: uuidv4() },
  ]);
  const [y, setY] = useState([
    // { value: -0.182, id: uuidv4() },
    // { value: -1.507, id: uuidv4() },
    // { value: -0.093, id: uuidv4() },
    // { value: 0.746, id: uuidv4() },
    // { value: 0.457, id: uuidv4() },
    // { value: 0.994, id: uuidv4() },
    // { value: -0.196, id: uuidv4() },
  ]);

  const [series, setSeries] = useState([]);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function createSmoothedChart() {
    let xData = x.map((item) => Number(item.value));
    let yData = y.map((item) => Number(item.value));
    let smoothedGraphics = [];
    let lastData = data;
    for (let i = 0; i < smoothingAmount; i++) {
      lastData =
        x.length === 0
          ? LocalDataSmoothing(labels, lastData, m, k, labels)
          : LocalDataSmoothing(xData, yData, m, k, labels);
      smoothedGraphics.push({
        name: `smoothed #${series.length + smoothedGraphics.length}`,
        data: lastData,
      });
    }
    setSeries([...series, ...smoothedGraphics]);
  }

  useMemo(() => {
    let x = lowerBound;
    let i = 0;
    let newData = [];
    let newLabels = [];
    let newRandoms = [];
    while (x < upperBound) {
      newData[i] = currentFunc(x);
      newLabels[i] = x.toFixed(3);
      x += step;
      i++;
    }

    for (let i = 0; i < rand; i++) {
      let random =
        Math.random() *
        (1 / 100) *
        getRandomInt(Math.floor(-rand / 2), Math.floor(rand / 2));
      let index = getRandomInt(0, newData.length);
      newData[index] *= random;
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
    setSeries([
      {
        name: func,
        data: data,
      },
    ]);
  }, [data]);

  return (
    <div className={cl.wrapper}>
      <Container>
        <div className={cl.pageTitle}>
          <h3>Selection of empirical formulas</h3>
        </div>
        <div className={cl.pageContent}>
          <div className={cl.settingsBlock}>
            <div className={cl.methodSettings}>
              <CSSTransition
                in={isTableVsb}
                timeout={250}
                classNames="fade"
                unmountOnExit
              >
                <div className={cl.tableContainer}>
                  <div className={cl.tableBlock}>
                    <div className={cl.tableRow}>
                      <span>X:</span>
                      <MatrixGrid
                        cells={x}
                        rotate={true}
                        updateData={setX}
                        updateChart={setLabels}
                      />
                    </div>
                    <div className={cl.tableRow}>
                      <span>Y:</span>
                      <MatrixGrid
                        cells={y}
                        rotate={true}
                        updateData={setData}
                        updateSeries={setSeries}
                        updateLabels={setLabels}
                        updateY={setY}
                        series={series}
                      />
                    </div>
                  </div>
                  <div className={cl.btnBlock}>
                    <CustomButton
                      className={cl.addBtn}
                      img={require("../img/plus.png")}
                      style={{
                        display:
                          x.length < labels.length ? "inline-block" : "none",
                      }}
                      onClick={() => {
                        if (x.length < labels.length) {
                          setX([...x, { value: "", id: uuidv4() }]);
                          setY([...y, { value: "", id: uuidv4() }]);
                        }
                      }}
                    />
                    <CustomButton
                      className={cl.addBtn}
                      img={require("../img/remove.png")}
                      style={{
                        display: x.length >= 1 ? "inline-block" : "none",
                      }}
                      onClick={() => {
                        if (x.length >= 1) {
                          x.pop();
                          setX([...x]);
                          y.pop();
                          setY([...y]);
                        }
                      }}
                    />
                  </div>
                </div>
              </CSSTransition>
              <div className={cl.funcSelect}>
                <select
                  onChange={(e) => {
                    setFunc(e.target.value);
                  }}
                >
                  <option>sin</option>
                  <option>cos</option>
                  <option>sqrt</option>
                </select>
              </div>
              <div className={cl.blockInp}>
                <span>Randomize</span>
                <input
                  placeholder={rand}
                  onChange={(e) => {
                    setRand(Number(e.target.value));
                  }}
                />
                <div className={cl.arrowBlock}>
                  <Transition
                    in={isTableVsb}
                    timeout={250}
                    onEnter={(node) => {
                      node.style.transform = "rotate(180deg)";
                    }}
                    onExit={(node) => {
                      node.style.transform = "rotate(0deg)";
                    }}
                  >
                    <img
                      src={require("../img/down-arrow.png")}
                      onClick={() => {
                        setIsTableVsb(!isTableVsb);
                      }}
                    />
                  </Transition>
                </div>
              </div>
              <div className={cl.blockInp}>
                <span>m</span>
                <input
                  placeholder={m}
                  onChange={(e) => {
                    setM(Number(e.target.value));
                  }}
                />
              </div>
              <div className={cl.blockInp}>
                <span className={cl.left}>k</span>
                <input
                  placeholder={k}
                  disabled={!(x.length === 0)}
                  onChange={(e) => {
                    setK(Number(e.target.value));
                  }}
                />
              </div>
              <div className={cl.blockInp}>
                <span>Lower Bound</span>
                <input
                  placeholder={lowerBound}
                  onChange={(e) => {
                    setLowerBound(Number(e.target.value));
                  }}
                />
              </div>
              <div className={cl.blockInp}>
                <span>Upper Bound</span>
                <input
                  placeholder={upperBound}
                  onChange={(e) => {
                    setUpperBound(Number(e.target.value));
                  }}
                />
              </div>
              <div className={cl.blockInp}>
                <span>Smoothing Amount</span>
                <input
                  placeholder={smoothingAmount}
                  onChange={(e) => {
                    setSmootingAmount(Number(e.target.value));
                  }}
                />
              </div>
              <div className={cl.blockInp}>
                <span>Step</span>
                <input
                  placeholder={step}
                  onChange={(e) => {
                    if (Boolean(Number(e.target.value)))
                      setStep(Number(e.target.value));
                  }}
                />
              </div>
              <CustomButton
                value="Build"
                className={cl.buildBtn}
                onClick={() => createSmoothedChart()}
                disabled={m === 0}
              />
            </div>
          </div>
          <CSSTransition
            in={isTableVsb}
            timeout={250}
            classNames="slide"
            onEntering={(node) => {
              node.style.marginTop = "90px";
            }}
            onExiting={(node) => {
              node.style.marginTop = "30px";
            }}
          >
            <div className={cl.chartBlock}>
              <SnackbarProvider
                ref={providerRef}
                maxSnack={4}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                TransitionComponent={Fade}
              >
                <CustomChart
                  labels={labels}
                  series={series}
                  setLabels={setLabels}
                  setSeries={setSeries}
                  setData={setData}
                  setFunc={setFunc}
                  popup={providerRef}
                />
              </SnackbarProvider>
            </div>
          </CSSTransition>
        </div>
      </Container>
    </div>
  );
}

export default Soefpage;
