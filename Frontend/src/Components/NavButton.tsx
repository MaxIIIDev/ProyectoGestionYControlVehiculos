/* Componente de botón de Navegacion reutilizable */
import { useNavigate } from "react-router-dom";
import "./css/NavButton.css";

interface NavButtonProps {
  iconClass: string;
  text: string;
}

export default function NavButton({ iconClass, text }: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <button className="nav-btn" onClick={() => navigate(-1)}>
      <span className="nav-btn-icon">
        <i className={iconClass}></i>
      </span>
      <span className="nav-btn-text">{text}</span>
    </button>
  );
}
