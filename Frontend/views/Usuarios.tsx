import CardGestion from "../src/Components/Cards/CardGestion";
import CardButton from "../src/Components/Cards/CardButton";
import CardRowContainer from "../src/Components/Cards/CardRowContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Gestión de Usuarios</h2>
      <CardRowContainer>
        <CardGestion
          title="Nuevo Usuario"
          icon="bi bi-person-plus"
          description="Agregar un nuevo usuario al sistema"
          button={
            <CardButton
              iconClass="bi bi-person-plus"
              text=" Agregar Usuario"
              onClick={() => navigate("/Usuarios/Nuevo")}
            />
          }
        />
        <CardGestion
          title="Listado de Usuarios"
          icon="bi bi-people"
          description="Listado, edición y eliminación de usuarios"
          button={
            <CardButton
              iconClass="bi bi-card-list"
              text=" Listar Usuarios"
              onClick={() => navigate("/Usuarios/Listar")}
            />
          }
        />
      </CardRowContainer>
      <NavButtonPosition />
    </>
  );
}
