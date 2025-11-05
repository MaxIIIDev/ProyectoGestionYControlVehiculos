import { Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import VehiculosGestion from "../../views/VehiculosGestion";
import VehiculosKilometros from "../../views/VehiculosKilometros";
import KilometrosListar from "../../views/VehiculosListar";
import VehiculosMantenimiento from "../../views/VehiculosMantenimieto";
import VehiculosListar from "../../views/VehiculosListar";
import VehiculosAgregar from "../../views/VehiculosAgregar";
import Matafuegos from "../../views/Matafuegos";
import Neumaticos from "../../views/Neumaticos";

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
        <Route path="/VehiculosGestion" element={<VehiculosGestion />} />
        <Route path="/ControlKilometraje" element={<VehiculosKilometros />} />
        <Route path="/KilometrosListar" element={<KilometrosListar />} />
        <Route path="/Mantenimiento" element={<VehiculosMantenimiento />} />
        <Route path="/Vehiculos/Listar" element={<VehiculosListar />} />
        <Route path="/Vehiculos/Nuevo" element={<VehiculosAgregar />} />
        <Route path="/Matafuegos" element={<Matafuegos />} />
        <Route path="/Neumaticos" element={<Neumaticos />} />
      </Routes>
    </Col>
  );
}
