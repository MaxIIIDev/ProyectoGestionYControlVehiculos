import CardGestion from "../src/Components/CardGestion";
import CardButton from "../src/Components/CardButton";
import CardRowContainer from "../src/Components/CardRowContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { useNavigate } from "react-router-dom";

export default function Neumaticos() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Gestión de Numáticos</h2>
      <CardRowContainer>
        <CardGestion
          title="Nuevo Neumático"
          icon="bi bi-plus-circle"
          description="Agregar un nuevo neumático"
          button={
            <CardButton
              iconClass="bi bi-plus-circle"
              text=" Agregar Neumático"
              onClick={() => {
                navigate("/Neumaticos/Nuevo");
              }}
            />
          }
        />
        <CardGestion
          title="Cambio de Neumáticos"
          icon="bi bi-arrow-repeat"
          description="Cambio de neumáticos en vehículos"
          button={
            <CardButton
              iconClass="bi bi-arrow-down-up"
              text=" Cambiar Neumáticos"
              onClick={() => {
                navigate("/Neumaticos/Asignar");
              }}
            />
          }
        />
        <CardGestion
          title="Listado de Neumáticos"
          icon="bi bi-list"
          description="Listado, edicion y eliminación de Neumáticos"
          button={
            <CardButton
              iconClass="bi bi-card-list"
              text=" Listar Neumáticos"
              onClick={() => {
                navigate("/Neumaticos/Listar");
              }}
            />
          }
        />
      </CardRowContainer>
      <NavButtonPosition />
    </>
  );
}
