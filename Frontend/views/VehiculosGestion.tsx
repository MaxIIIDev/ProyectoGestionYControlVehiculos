import CardGestion from "../src/Components/CardGestion";
import CardButton from "../src/Components/CardButton";
import CardRowContainer from "../src/Components/CardRowContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { useNavigate } from "react-router-dom";
export default function VehiculosGestion() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Gestión de Vehículos</h2>
      <CardRowContainer>
        <CardGestion
          title="Nuevo Vehículo"
          icon="bi bi-car-front"
          description="Alta de nuevos Vehículos"
          button={
            <CardButton
              iconClass="bi bi-plus-circle"
              text=" Agregar Vehículo"
              onClick={() => {
                navigate("/Vehiculos/Nuevo");
              }}
            />
          }
        />
        <CardGestion
          title="Listar Vehículos"
          icon="bi bi-list"
          description="Listado, edicion y eliminación de Vehículos"
          button={
            <CardButton
              iconClass="bi bi-card-list"
              text=" Listar Vehículos"
              onClick={() => {
                navigate("/Vehiculos/Listar");
              }}
            />
          }
        />
        <CardGestion
          title="Documentacion"
          icon="bi bi-file-earmark-text"
          description="Documentación de Vehículos"
          button={
            <CardButton
              iconClass="bi bi-file-earmark-text"
              text=" Ver Documentación"
              onClick={() => {
                navigate("/Vehiculos/Documentacion");
              }}
            />
          }
        />
      </CardRowContainer>
      <NavButtonPosition />
    </div>
  );
}
