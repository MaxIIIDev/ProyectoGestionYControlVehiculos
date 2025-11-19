import { useState } from "react";
import { endpointsAPI } from "../src/Components/Routes/Enrouters";

import ComboBoxBrowser from "../src/Components/FormBuscador/ComboBoxBrowser";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { Button } from "react-bootstrap";

export default function VehiculosDocumentos() {
  const [patente, setPatente] = useState<string>("");
  return (
    <>
      <h2>Documentos de Vehículos</h2>
      <ComboBoxBrowser
        apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
        apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
        name="patente"
        placeholder="Buscador por Patente"
        onSelect={(value) => setPatente(value)}
        defaultOption="Buscador por Patente"
      />
      {patente && (
        <Button type="submit" className="mt-3">
          Buscar
        </Button>
      )}

      <NavButtonPosition />
    </>
  );
}
