// Frontend/src/App.tsx

import "./App.css";
import NavButton from "./Components/NavButton";
import TabFilterRadios from "./Components/TableFilterRadios";
import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    /*<BrowserRouter>
      <NavButton iconClass="bi bi-house" text="  Home" />
    </BrowserRouter>*/
    /*<BrowserRouter>
      <div style={{ padding: "2rem" }}>
        <TabFilterRadios
          options={[
            { icon: "bi-house", label: "Patente", value: "op1" },
            { icon: "bi-building", label: "Usuario", value: "op2" },
            { icon: "bi-trash", label: "Eliminar", value: "op3" },
            { icon: "bi-people", label: "Clientes", value: "op4" },
          ]}
          defaultValue="op1"
          onChange={(value) => console.log("Seleccionado:", value)}
        />
      </div>
    </BrowserRouter>*/
    <></>
  );
}

export default App;
