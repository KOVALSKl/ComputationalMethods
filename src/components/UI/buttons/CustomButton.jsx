import react from "react";
import cl from "./styles/CustomButton.module.css"

function CustomButton({value, onClick}) {
    return (
        <button className={cl.btn} onClick={(e) => onClick()}>
            {value}
        </button>
    );
}

export default CustomButton;