import { useEffect, useState } from "react";

import { endpointsAPI } from "../src/Components/Routes/Enrouters";
import NavButtonPosition from "../src/Components/NavButtonPosition";

export default function VehiculosDocumentos() {
  const [vehiculos, setVehiculos] = useState<any[]>([]);

  useEffect(() => {
    fetch(endpointsAPI.vehiculos.listar.action, {
      method: endpointsAPI.vehiculos.listar.method,
    })
      .then((res) => res.json())
      .then((data) => {
        setVehiculos(data.items);
      });
  }, []);

  return (
    <>
      <h2>Documentos de Vehículos</h2>

      <NavButtonPosition />
    </>
  );
}
