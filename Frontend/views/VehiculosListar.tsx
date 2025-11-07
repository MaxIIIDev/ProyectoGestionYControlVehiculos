import TableContainer from "../src/Components/TableContainer";
import TabFilterRadios from "../src/Components/TableFilterRadios";
import TableResponsive from "../src/Components/TableResponsive";
import endpoints from "../src/Components/Routes/Enrouters";
import { useEffect, useState } from "react";
import NavButtonPosition from "../src/Components/NavButtonPosition";

const headers = [
  "Marca",
  "Modelo",
  "Año",
  "Patente",
  "Numero de Chasis",
  "Numero de Motor",
];
const colWidths = ["120px", "120px", "80px", "100px", "150px", "150px"];

export default function VehiculosListar() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch(endpoints.vehiculos.listar.action, {
      method: endpoints.vehiculos.listar.method,
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const tableData = data.map((vehiculo: any) => (
    <tr key={vehiculo.idVehiculo}>
      <td>{vehiculo.marca}</td>
      <td>{vehiculo.modelo}</td>
      <td>{vehiculo.anio}</td>
      <td>{vehiculo.patente}</td>
      <td>{vehiculo.numeroChasis}</td>
      <td>{vehiculo.numeroMotor}</td>
    </tr>
  ));

  return (
    <>
      <div className="my-4 d-flex justify-content-end">
        <TabFilterRadios
          defaultValue="opcion1"
          options={[
            { value: "opcion1", label: " Ver Todos", icon: "bi-house" },
            { value: "opcion2", label: " Ver Activos", icon: "bi-car" },
            { value: "opcion3", label: " Ver Inactivos", icon: "bi-bicycle" },
          ]}
        />
      </div>
      <TableContainer title="Listado de Vehículos">
        <TableResponsive
          headerTitle={headers}
          colWidths={colWidths}
          tableData={tableData}
        />
      </TableContainer>
      <NavButtonPosition />
    </>
  );
}
