/* Componente de botón de Navegacion reutilizable */
import { useNavigate } from "react-router-dom";
import "./css/NavButton.css";

interface NavButtonProps {
  iconClass: string;
  text: string;
  onClick?: () => void;
}

export default function NavButton({
  iconClass,
  text,
  onClick,
}: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="nav-btn"
      onClick={onClick ? onClick : () => navigate(-1)}>
      <span className="nav-btn-icon">
        <i className={iconClass}></i>
      </span>
      <span className="nav-btn-text">{text}</span>
    </button>
  );
}
