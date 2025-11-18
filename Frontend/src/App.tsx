import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "sweetalert2/src/sweetalert2.scss";
import TopNavBar from "./Components/TopNavBar";
import SideNavBar from "./Components/SideNavBar";
import RoutesComponent from "./Components/RoutesComponent";

function App() {
  return (
    <>
      <Router>
        <TopNavBar />
        <Container fluid>
          <Row>
            <SideNavBar />
            <RoutesComponent />
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;
