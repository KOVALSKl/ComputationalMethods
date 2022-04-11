import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import MatrixGrid from "./MatrixGrid";
import Householder  from "../methods/slae/Householder";
import cl from "./styles/SolveForm.module.css"
import CustomButton from "./UI/buttons/CustomButton";
import { useMediaQuery } from 'react-responsive';
import Matrix from "../methods/objects/Matrix";
import Vector from "../methods/objects/Vector";

function SolveForm({ setChanges, className }) {
    const [matrix, setMatrix] = useState([]);
    const [matrixWidth, setMatrixWidth] = useState(matrix.length * 40)
    const [freeMembers, setFreeMembers] = useState([]);
    const [systemSize, setSystemSize] = useState(2);
    const [method, setMethod] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    function updateMatrix() {
        let arr = [...matrix];
        if (matrix.length > systemSize * systemSize)
            arr = matrix.slice(0, systemSize * systemSize);
        else {
            for (let i = 0; i < systemSize * systemSize - matrix.length; i++) {
                arr.push({
                    id: uuidv4(),
                    value: ''
                })
            }
        }
        setMatrixWidth(systemSize * 70);
        return arr;
    }

    function updateFreeMembers() {
        if (freeMembers.length > systemSize)
            return freeMembers.slice(0, systemSize);
        else {
            let arr = [...freeMembers];
            for (let i = 0; i < systemSize - freeMembers.length; i++) {
                arr.push({
                    id: uuidv4(),
                    value: ''
                })
            }
            return arr;
        }
    }

    function sendDataToSolve() {
        let data = [];
        for(let i = 0; i < matrix.length; i++) {
            data.push(Number(matrix[i].value));
        }

        let ansCol = [];
        for (let i = 0; i < freeMembers.length; i++) {
            ansCol.push(Number(freeMembers[i].value));
        }
        let mat = new Matrix({
            data: data,
            rows: systemSize,
        });
        let free = new Vector(ansCol);
        var time = performance.now();
        let met =  Householder(mat, free)
            // : gramSchmidt(mat, ansCol)
        time = performance.now() - time;
        met.time = (time);
        setChanges(met);
    }

    useEffect(() => {
        setMatrix(updateMatrix());
        setFreeMembers(updateFreeMembers());
    }, [systemSize])

    return (
        <div
            className={[cl.slvForm, className].join(" ")}
            style={
                isMobile
                    ? { borderBottom: "1px solid rgba(0, 117, 183, 0.9)" }
                    : { borderRight: "1px solid rgba(0, 117, 183, 0.9)" }
            }>
            <div className={cl.settingsBlock}>
                <div>
                    <span>method:</span>
                    <select onChange={(e) => {
                        setMethod(Number(e.target.value));
                    }}>
                        <option value={0}>Householder Method</option>
                        <option value={1}>Gram-Schmidt Orthogonalization</option>
                    </select>
                </div>
                <div>
                    <span>system size:</span>
                    <select onChange={(e) => {
                        setSystemSize(Number(e.target.value));
                    }}>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option disabled={isMobile}>6</option>
                    </select>
                </div>
            </div>
            <div
                className={cl.condBlock}
                style={
                    isMobile
                        ? { flexDirection: "column" }
                        : { flexDirection: "row" }
                }

            >
                <MatrixGrid
                    cells={matrix}
                    width={matrixWidth}
                    device={isMobile}
                    rotate={true} />
                <div className={cl.equalSymb}>=</div>
                <MatrixGrid
                    cells={freeMembers}
                    className={cl.freeMembGrid}
                    device={isMobile}
                    rotate={isMobile} />
            </div>
            <CustomButton value="solve" onClick={sendDataToSolve} />
        </div>
    );
}

export default SolveForm;