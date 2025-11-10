import CardGestion from "../src/Components/Cards/CardGestion";
import CardButton from "../src/Components/Cards/CardButton";
import CardRowContainer from "../src/Components/Cards/CardRowContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { useNavigate } from "react-router-dom";

export default function KilometrosListar() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Control de Kilometraje</h2>
      <CardRowContainer>
        <CardGestion
          title="Nuevo Control de Kilometraje"
          icon="bi bi-speedometer"
          description="Nuevo registro de kilometraje"
          button={
            <CardButton
              iconClass="bi bi-plus-circle"
              text=" Agregar Control"
              onClick={() => {
                navigate("/Kilometros/Nuevo");
              }}
            />
          }
        />
        <CardGestion
          title="Listado de Controles de Kilometraje"
          icon="bi bi-list"
          description="Listado, edicion y eliminación de Registros de Kilometraje"
          button={
            <CardButton
              iconClass="bi bi-card-list"
              text=" Listar Registros de Kilometraje"
              onClick={() => {
                navigate("/Kilometros/Listar");
              }}
            />
          }
        />
      </CardRowContainer>
      <CardRowContainer>
        <CardGestion
          title="Nuevo Checklist"
          icon="bi bi-card-checklist"
          description="Nuevo Checklist de control Vehicular"
          button={
            <CardButton
              iconClass="bi bi-plus-circle"
              text=" Nuevo Checklist de Vehículos"
              onClick={() => {
                navigate("/Checklist/Nuevo");
              }}
            />
          }
        />
        <CardGestion
          title="Listado de Checklists"
          icon="bi bi-list-check"
          description="Listado, edicion y eliminación de Checklists"
          button={
            <CardButton
              iconClass="bi bi-list-check"
              text=" Listar Checklists"
              onClick={() => {
                navigate("/Checklist/Listar");
              }}
            />
          }
        />
      </CardRowContainer>
      <NavButtonPosition />
    </>
  );
}
