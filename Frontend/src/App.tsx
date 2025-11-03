import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Form, Row } from "react-bootstrap";

import TopNavBar from "./Components/TopNavBar";
import SideNavBar from "./Components/SideNavBar";
import RoutesComponent from "./Components/RoutesComponent";
import FormInput from "./Components/FormInput";

function App() {
  return (
    /*<>
      <Router>
        <TopNavBar />
        <Container fluid>
          <Row>
            <SideNavBar />
            <RoutesComponent />
          </Row>
        </Container>
      </Router>
    </>*/
    <>
      <Form>
        <FormInput placeholder="Nombre" type="text" name="name" id="name" />
        <FormInput placeholder="Email" type="email" name="email" id="email" />
        <FormInput
          placeholder="Contraseña"
          type="password"
          name="password"
          id="password"
        />
      </Form>
    </>
  );
}

export default App;
