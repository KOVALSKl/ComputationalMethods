import react, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import cl from "./styles/AnsForm.module.css"

function AnsForm({ ansCol, className }) {
    return (
        <div className={[cl.ansForm, className].join(" ")}>
            {ansCol.length === 0
                ? <div>Nothing to solve</div>
                : <div>
                    <div className={cl.methodTtl}>{ansCol.title}</div>
                    <div className={cl.time}>{ansCol.time}ms</div>
                    {ansCol.matrix.map((item, index) => {
                        return <div className={cl.ansColCell} key={uuidv4()}>
                            <span>X<sub>{index + 1}</sub> = </span>
                            <span>{item}</span>
                        </div>
                    })}
                </div>
            }
        </div>
    );
}

export default AnsForm;