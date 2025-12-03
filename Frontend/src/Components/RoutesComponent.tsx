import { Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import VehiculosGestion from "../../views/Vehiculo/VehiculosGestion";
import VehiculosKilometros from "../../views/VehiculosKilometros";
import { AgregarRegistroKilometraje } from "../../views/RegistrosKilometraje/AgregarRegistroKilometraje";
import ActualizarRegistroKilometraje from "../../views/RegistrosKilometraje/ActualizarRegistroKilometraje";
import VehiculosMantenimiento from "../../views/VehiculosMantenimieto";
import VehiculosListar from "../../views/Vehiculo/VehiculosListar";
import VehiculosAgregar from "../../views/Vehiculo/VehiculosAgregar";
import Matafuegos from "../../views/Matafuegos";
import Neumaticos from "../../views/Neumaticos";
import KilometrosListar from "../../views/RegistrosKilometraje/KilometrosListar";
import VehiculosAcualizar from "../../views/Vehiculo/VehiculosActualizar";
import VehiculosDocumentos from "../../views/VehiculosDocumentos";
import Checklist from "../../views/Checklist/Checklist";
import { endpointFront } from "./Routes/Enrouters";
import { AgregarMatafuego } from "../../views/Matafuegos/AgregarMatafuego";
import { ListarMatafuegos } from "../../views/Matafuegos/ListarMatafuegos";
import ChecklistListar from "../../views/Checklist/ChecklistListar";
export default function RoutesComponent() {
  return (
    <Col xs={12} md={9} lg={10} className="p-4 bg-secondary">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>
                Bienvenido al sistema de Gestión de vehículos de Eco Group
                S.R.L.
              </h1>
              <p>App con React y Bootstrap.</p>
            </>
          }
        />
        <Route
          path={endpointFront.vehiculos.gestion.action}
          element={<VehiculosGestion />}
        />
        <Route
          path={endpointFront.controlKilometraje.gestion.action}
          element={<VehiculosKilometros />}
        />
        <Route
          path={endpointFront.controlKilometraje.nuevo.action}
          element={<AgregarRegistroKilometraje />}
        />
        <Route
          path={endpointFront.controlKilometraje.actualizar.endpoint}
          element={<ActualizarRegistroKilometraje />}
        />
        <Route
          path={endpointFront.controlKilometraje.listar.action}
          element={<KilometrosListar />}
        />
        <Route
          path={endpointFront.mantenimiento.gestion.action}
          element={<VehiculosMantenimiento />}
        />
        <Route
          path={endpointFront.vehiculos.listar.action}
          element={<VehiculosListar />}
        />
        <Route
          path={endpointFront.vehiculos.nuevo.action}
          element={<VehiculosAgregar />}
        />
        <Route
          path={endpointFront.vehiculos.actualizar.endpoint}
          element={<VehiculosAcualizar />}
        />
        <Route
          path={endpointFront.matafuegos.gestion.action}
          element={<Matafuegos />}
        />
        <Route
          path={endpointFront.neumaticos.gestion.action}
          element={<Neumaticos />}
        />
        <Route
          path={endpointFront.vehiculos.documentos.action}
          element={<VehiculosDocumentos />}
        />
        <Route
          path={endpointFront.checklist.gestion.action}
          element={<Checklist />}
        />
        <Route
          path={endpointFront.matafuegos.agregar.action}
          element={<AgregarMatafuego />}
        />
        <Route
          path={endpointFront.matafuegos.listar.action}
          element={<ListarMatafuegos />}
        ></Route>
        <Route
          path={endpointFront.checklist.listar.action}
          element={<ChecklistListar />}
        />
      </Routes>
    </Col>
  );
}
