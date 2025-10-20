/* Componente de botón de acción reutilizable */
import type { MouseEventHandler } from "react";
interface ActionButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  iconClass: string;
  text: string;
}

export default function ActionButton({
  onClick,
  iconClass,
  text,
}: ActionButtonProps) {
  return (
    <button
      className="btn border-dark btn-lg mt-3"
      style={{
        borderRadius: "25px",
        background: "linear-gradient(135deg, #253824ff 0%, #4e684cff 100%)",
      }}
      onClick={onClick}
    >
      <i className={iconClass}></i>
      {text}
    </button>
  );
}
