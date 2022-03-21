import react from "react";
import cl from "./styles/CustomButton.module.css"

function CustomButton({ value, onClick, className, disabled }) {
    return (
        <button
            className={[cl.btn, className].join(' ')}
            onClick={(e) => onClick()}
            disabled={disabled}>
            {value}
        </button>
    );
}

export default CustomButton;