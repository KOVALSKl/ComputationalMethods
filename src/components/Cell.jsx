import react, { useState } from "react";
import cl from "./styles/Cell.module.css";

function Cell(props) {

    const [value, setValue] = useState('');

    return (
        <div className={cl.cell}>
            <input value={value} onChange={(e) => {
                setValue(e.target.value);
            }} />
        </div>
    );
}

export default Cell;