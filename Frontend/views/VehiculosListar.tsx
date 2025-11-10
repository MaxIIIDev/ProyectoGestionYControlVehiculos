import TableContainer from "../src/Components/Table/TableContainer";
import TabFilterRadios from "../src/Components/Table/TableFilterRadios";
import TableResponsive from "../src/Components/Table/TableResponsive";
import endpoints from "../src/Components/Routes/Enrouters";
import { useEffect, useState } from "react";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import ModalTableHandler from "../src/Components/Functions/ModalTableHandler";
import ModalTable from "../src/Components/Table/ModalTable";
import ButtonEdit from "../src/Components/Table/ModalTableButtonsAll";

const headers = [
  "Marca",
  "Modelo",
  "Año",
  "Patente",
  "Numero de Chasis",
  "Numero de Motor",
];
const colWidths = ["90px", "100px", "50px", "65px", "200px", "150px"];

export default function VehiculosListar() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedModelo, setSelectedModelo] = useState<string>("");
  const [selectedPatente, setSelectedPatente] = useState<string>("");
  const handleRowClick = (id: string, modelo?: string, patente?: string) => {
    setSelectedId(id);
    setSelectedModelo(modelo || "");
    setSelectedPatente(patente || "");
    setShowModal(true);
  };
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
    <tr
      key={vehiculo.idVehiculo}
      onClick={ModalTableHandler(handleRowClick, ["modelo", "patente"])}
      style={{ cursor: "pointer" }}
      data-id={vehiculo.idVehiculo}
      data-modelo={vehiculo.modelo}
      data-patente={vehiculo.patente}
    >
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
            { value: "opcion1", label: " Ver Todos", icon: "bi-eye" },
            { value: "opcion2", label: " Ver Activos", icon: "bi-power" },
            { value: "opcion3", label: " Ver Inactivos", icon: "bi-x-circle" },
          ]}
        />
      </div>
      <TableContainer title="Listado de Vehículos">
        <TableResponsive
          headerTitle={headers}
          colWidths={colWidths}
          tableData={tableData}
        />
        <ModalTable
          show={showModal}
          title={selectedModelo + " " + selectedPatente}
        >
          <ButtonEdit
            id={selectedId ? selectedId : ""}
            method={endpoints.vehiculos.buscarPorId.method}
            endpoint={endpoints.vehiculos.buscarPorId.action(
              selectedId ? parseInt(selectedId) : 0
            )}
          />
        </ModalTable>
      </TableContainer>
      <NavButtonPosition />
    </>
  );
}
