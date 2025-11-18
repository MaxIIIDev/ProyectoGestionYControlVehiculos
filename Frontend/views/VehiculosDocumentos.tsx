import { useState, useEffect } from "react";
import { endpointsAPI } from "../src/Components/Routes/Enrouters";
import FormBuscador from "../src/Components/FormBuscador/FormBrowser";
import ComboBoxBrowser from "../src/Components/FormBuscador/ComboBoxBrowser";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import { Button } from "react-bootstrap";

export default function VehiculosDocumentos() {
  const [patente, setPatente] = useState("");
  const [opcionesPatentes, setOpcionesPatentes] = useState<
    { value: string; label: string }[]
  >([]);

  // Cargar patentes al montar el componente
  useEffect(() => {
    fetch(endpointsAPI.vehiculos.listar.action, {
      method: endpointsAPI.vehiculos.listar.method,
    })
      .then((res) => res.json())
      .then((data) => {
        const opciones = (data.items || []).map((vehiculo: any) => ({
          value: vehiculo.patente,
          label: vehiculo.patente,
        }));
        setOpcionesPatentes(opciones);
      });
  }, []);

  return (
    <>
      <h2>Documentos de Vehículos</h2>
      <FormBuscador
        name="Buscar por patente Form"
        method={endpointsAPI.vehiculos.buscarPorPatente.method}
        action={endpointsAPI.vehiculos.buscarPorPatente.action(patente)}
      >
        <ComboBoxBrowser
          options={opcionesPatentes}
          onSelect={setPatente}
          value={patente}
          defaultOption="Seleccione una patente"
        />
        {patente && (
          <Button type="submit" className="mt-3">
            Buscar
          </Button>
        )}
      </FormBuscador>
      <NavButtonPosition />
    </>
  );
}
