import CardGestion from "../src/Components/CardGestion";
import CardButton from "../src/Components/CardButton";
import CardRowContainer from "../src/Components/CardRowContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { useNavigate } from "react-router-dom";

export default function VehiculosMantenimiento() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Gestión de Mantenimiento de Vehículos</h2>
      <CardRowContainer>
        <CardGestion
          title="Programar Mantenimiento"
          icon="bi bi-wrench-adjustable-circle"
          description="Programar mantenimiento para vehículos"
          button={
            <CardButton
              iconClass="bi bi-plus-circle"
              text=" Programar Mantenimiento"
              onClick={() => {
                navigate("/Mantenimiento/Nuevo");
              }}
            />
          }
        />
        <CardGestion
          title="Tareas Excepcionales"
          icon="bi bi-exclamation-diamond-fill"
          description="Gestión de tareas excepcionales para vehículos"
          button={
            <CardButton
              iconClass="bi bi-exclamation-circle"
              text=" Nueva Tarea Excepcional"
              onClick={() => {
                navigate("/Vehiculos/Documentacion");
              }}
            />
          }
        />
        <CardGestion
          title="Historial de Mantenimientos"
          icon="bi bi-list"
          description="Listado, edicion y eliminación de Mantenimientos"
          button={
            <CardButton
              iconClass="bi bi-card-list"
              text=" Listar Mantenimientos"
              onClick={() => {
                navigate("/Mantenimiento/Listar");
              }}
            />
          }
        />
      </CardRowContainer>
      <NavButtonPosition />
    </>
  );
}
