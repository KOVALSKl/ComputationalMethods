import react from "react";
import cl from "./styles/CustomButton.module.css"

function CustomButton({value}) {
    return (
        <button className={cl.btn}>
            {value}
        </button>
    );
}

export default CustomButton;