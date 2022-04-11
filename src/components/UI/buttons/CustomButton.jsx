import react from "react";
import cl from "./styles/CustomButton.module.css";

function CustomButton({
  value,
  onClick,
  className,
  disabled,
  img = null,
  style = null,
}) {
  return (
    <button
      className={[cl.btn, className].join(" ")}
      onClick={(e) => onClick()}
      style={style}
      disabled={disabled}
    >
      {img ? <img src={img} /> : value}
    </button>
  );
}

export default CustomButton;
