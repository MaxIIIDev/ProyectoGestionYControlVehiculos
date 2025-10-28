/* Componente de botón de acción reutilizable */
import type { MouseEventHandler } from "react";
import "./css/CardButton.css";
interface CardButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  iconClass: string;
  text: string;
}

export default function CardButton({
  onClick,
  iconClass,
  text,
}: CardButtonProps) {
  return (
    <button
      className="card-btn"
      style={{
        borderRadius: "25px",
        background: "",
        color: "black",
      }}
      onClick={onClick}
    >
      <i className={iconClass}></i>
      {text}
    </button>
  );
}
