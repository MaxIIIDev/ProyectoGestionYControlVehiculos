// Frontend/src/App.tsx

import "./App.css";
import NavButton from "./Components/NavButton";
import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <NavButton iconClass="bi bi-house" text="  Home" />
    </BrowserRouter>
  );
}

export default App;
