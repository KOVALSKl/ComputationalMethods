import react, { useState } from "react";
import cl from "./styles/Cell.module.css";

function Cell({ id, setChanges, val, device }) {
  const [value, setValue] = useState(val);

  return (
    <div>
      <input
        className={cl.cell}
        value={value}
        placeholder="0"
        onChange={(e) => {
          setValue(e.target.value);
          setChanges({
            id: id,
            changes: e.target.value,
          });
        }}
        style={
          device
            ? { width: "60px", height: "30px" }
            : { width: "60px", height: "30px" }
        }
      />
    </div>
  );
}

export default Cell;
