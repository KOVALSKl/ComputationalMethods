import react from "react";
import MatrixGrid from "./MatrixGrid";
import cl from "./styles/SolveForm.module.css"
import CustomButton from "./UI/buttons/CustomButton";

function SolveForm(props) {
    return (
        <div className={cl.slvForm}>
            <MatrixGrid cells={props.cells}/>
            <CustomButton value="solve"/>
        </div>
    );
}

export default SolveForm;