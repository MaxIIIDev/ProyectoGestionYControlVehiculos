import CardGestion from "../src/Components/Cards/CardGestion";
import CardButton from "../src/Components/Cards/CardButton";
import CardRowContainer from "../src/Components/Cards/CardRowContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { useNavigate } from "react-router-dom";

export default function GestionMatafuegos() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Gestión de Matafuegos</h2>
      <CardRowContainer>
        <CardGestion
          title="Nuevo Matafuego"
          icon="bi bi-droplet"
          description="Alta de nuevos Matafuegos"
          button={
            <CardButton
              iconClass="bi bi-plus-circle"
              text=" Agregar Matafuego"
              onClick={() => {
                navigate("/Matafuegos/Nuevo");
              }}
            />
          }
        />
        <CardGestion
          title="Listar Matafuegos"
          icon="bi bi-list"
          description="Listado, edicion y eliminación de Matafuegos"
          button={
            <CardButton
              iconClass="bi bi-card-list"
              text=" Listar Matafuegos"
              onClick={() => {
                navigate("/Matafuegos/Listar");
              }}
            />
          }
        />
        <CardGestion
          title="Documentacion"
          icon="bi bi-file-earmark-text"
          description="Documentación de Matafuegos"
          button={
            <CardButton
              iconClass="bi bi-file-earmark-text"
              text=" Ver Documentación"
              onClick={() => {
                navigate("/Matafuegos/Documentacion");
              }}
            />
          }
        />

        <CardGestion
          title="Asignar Matafuego a Vehículo"
          icon="bi bi-truck"
          description="Asignar Matafuego a un Vehículo"
          button={
            <CardButton
              iconClass="bi bi-truck"
              text=" Asignar Matafuego"
              onClick={() => {
                navigate("/Matafuegos/AsignarAVehiculo");
              }}
            />
          }
        />
      </CardRowContainer>
      <NavButtonPosition />
    </>
  );
}
