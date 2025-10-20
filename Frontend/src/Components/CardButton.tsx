/* Componente de botón de acción reutilizable */
import type { MouseEventHandler } from "react";
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
      className="btn border-dark btn-lg mt-3"
      style={{
        borderRadius: "25px",
        background: "linear-gradient(135deg, #b5dcb3ff 0%, #4e684cff 100%)",
        color: "black",
      }}
      onClick={onClick}
    >
      <i className={iconClass}></i>
      {text}
    </button>
  );
}
