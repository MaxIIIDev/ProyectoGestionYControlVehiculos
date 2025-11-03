/*Card Reactivo de gestion sin botones*/
import type { ReactNode } from "react";
import "../Components/css/CardGestion.css";

interface CardGestionProps {
  title: string;
  icon: string;
  description: string;
  button: ReactNode;
}

export default function CardGestion({
  title,
  icon,
  description,
  button,
}: CardGestionProps) {
  return (
    <div className="col-md-4">
      <div className="card-gestion border-0 text-center h-100">
        <div className="card-body d-flex flex-column justify-content-center">
          <i className={`${icon} display-1 mb-3`}></i>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text">{description}</p>
          {button}
        </div>
      </div>
    </div>
  );
}
