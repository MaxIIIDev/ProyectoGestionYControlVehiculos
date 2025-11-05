/* Componente de botón de acción reutilizable */
import type { MouseEventHandler } from "react";
import "./css/CardButton.css";
interface CardButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  iconClass: string;
  text: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function CardButton({
  onClick,
  iconClass,
  text,
  style,
  className,
}: CardButtonProps) {
  return (
    <button
      className={`card-btn ${className}`}
      style={{
        borderRadius: "25px",
        color: "black",
        ...style,
      }}
      onClick={onClick}
    >
      <i className={iconClass}></i>
      {text}
    </button>
  );
}
