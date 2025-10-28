// Importacion de Vistas Para routeo
import VehiculosGestion from "../views/VehiculosGestion";
import VehiculosKilometros from "../views/VehiculosKilometros";
import KilometrosListar from "../views/KilometrosListar";
import VehiculosMantenimiento from "../views/VehiculosMantenimieto";
import VehiculosListar from "../views/VehiculosListar";
import VehiculoAgregar from "../views/VehiculosAgregar";

import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import TopNavBar from "./Components/TopNavBar";
import SideNavBar from "./Components/SideNavBar";

function App() {
  return (
    <Router>
      <TopNavBar />
      <Container fluid>
        <Row>
          <Col
            xs={12}
            md={3}
            lg={2}
            className="p-0 bg-dark"
            style={{ minHeight: "100vh" }}
          >
            <SideNavBar />
          </Col>
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
              <Route path="/vehiculos-gestion" element={<VehiculosGestion />} />
              <Route
                path="/control-kilometraje"
                element={<VehiculosKilometros />}
              />
              <Route path="/kilometros-listar" element={<KilometrosListar />} />
              <Route
                path="/mantenimiento"
                element={<VehiculosMantenimiento />}
              />

              <Route path="/vehiculo-listar" element={<VehiculosListar />} />
              <Route path="/vehiculo-agregar" element={<VehiculoAgregar />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
