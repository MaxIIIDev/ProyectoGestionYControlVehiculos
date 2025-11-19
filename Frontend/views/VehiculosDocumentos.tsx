import { useState } from "react";
import { endpointsAPI } from "../src/Components/Routes/Enrouters";

import ComboBoxBrowser from "../src/Components/FormBuscador/ComboBoxBrowser";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { Button } from "react-bootstrap";

export default function VehiculosDocumentos() {
  const [idVehiculo, setIdVehiculo] = useState<string>("");
  const mostrar = () => {
    console.log(idVehiculo);
  };
  return (
    <>
      <h2>Documentos de Vehículos</h2>
      <ComboBoxBrowser
        apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
        apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
        name="patente"
        placeholder="Buscador por Patente"
        onSelect={(value) => setIdVehiculo(value)}
        defaultOption="Buscador por Patente"
      />
      {idVehiculo && (
        <Button type="submit" className="mt-3" onClick={mostrar}>
          Buscar
        </Button>
      )}

      <NavButtonPosition />
    </>
  );
}
