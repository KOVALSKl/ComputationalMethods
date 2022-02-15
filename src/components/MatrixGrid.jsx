import react from "react";
import Cell from "./Cell";
import cl from "./styles/MatrixGrid.module.css"

function MatrixGrid({ cells }) {
    return (
        <div className={cl.grid}>
            {cells.map((cell) => {
               return <Cell key={cell.id} />
            })}
        </div>
    );
}

export default MatrixGrid;