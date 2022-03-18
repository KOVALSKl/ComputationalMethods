import react from "react";
import Cell from "./Cell";
import cl from "./styles/MatrixGrid.module.css"

function MatrixGrid({ cells, className, width, device, rotate }) {

    function setChanges({ id, changes, value }) {
        const [cell] = cells.filter((item) => item.id === id);
        cell.value = changes;
    }
    return (
        <div
            className={[cl.grid, className].join(" ")}
            style={{
                width: width, flexDirection:
                    rotate
                        ? "row"
                        : "column"
            }}
        >
            {cells.map((cell) => {
                return <Cell
                    key={cell.id}
                    id={cell.id}
                    setChanges={setChanges}
                    val={cell.value}
                    device={device} />
            })}
        </div>
    );
}

export default MatrixGrid;