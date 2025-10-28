import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Accordion, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SideNavBar() {
  return (
    <Col
      xs={12}
      md={3}
      lg={2}
      className="p-0 bg-dark"
      style={{ minHeight: "100vh" }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        className="flex-md-column align-items-start p-3 min-vh-100"
      >
        <Navbar.Toggle aria-controls="sidebar-nav" />
        <Navbar.Collapse id="sidebar-nav" className="flex-column w-100">
          <Nav className="flex-column w-100">
            <Accordion
              defaultActiveKey="0"
              className="w-100 mb-2 accordion-dark"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <i className="bi bi-truck me-2"></i> Vehículos
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <Nav className="flex-column">
                    <Nav.Link as={Link} to="/VehiculosGestion" className="ps-4">
                      <i className="bi bi-list"></i> Gestión de Vehículos
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/ControlKilometraje"
                      className="ps-4"
                    >
                      <i className="bi bi-speedometer2"></i> Control de
                      Kilometraje
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Mantenimiento" className="ps-4">
                      <i className="bi bi-wrench"></i> Mantenimiento
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Matafuegos" className="ps-4">
                      <i className="bi bi-fire"></i> Matafuegos
                    </Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  );
}
