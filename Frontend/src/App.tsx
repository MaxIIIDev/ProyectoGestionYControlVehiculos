import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import RoutesComponent from "./Components/RoutesComponent";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <RoutesComponent />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
