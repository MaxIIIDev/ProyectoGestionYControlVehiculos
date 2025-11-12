import { Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import VehiculosGestion from "../../views/Vehiculo/VehiculosGestion";
import VehiculosKilometros from "../../views/VehiculosKilometros";
import VehiculosMantenimiento from "../../views/VehiculosMantenimieto";
import VehiculosListar from "../../views/Vehiculo/VehiculosListar";
import VehiculosAgregar from "../../views/Vehiculo/VehiculosAgregar";
import Matafuegos from "../../views/Matafuegos";
import Neumaticos from "../../views/Neumaticos";
import KilometrosListar from "../../views/VehiculosKilometros";
import VehiculosAcualizar from "../../views/Vehiculo/VehiculosActualizar";
import { endpointFront } from "./Routes/Enrouters";

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
          path={endpointFront.vehiculos.actualizar.action}
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
      </Routes>
    </Col>
  );
}
