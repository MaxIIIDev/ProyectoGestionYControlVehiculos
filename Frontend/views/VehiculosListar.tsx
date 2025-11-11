import TableContainer from "../src/Components/Table/TableContainer";
import TabFilterRadios from "../src/Components/Table/TableFilterRadios";
import TableResponsive from "../src/Components/Table/TableResponsive";
import endpoints from "../src/Components/Routes/Enrouters";
import { useEffect, useState } from "react";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import ModalTableHandler from "../src/Components/Functions/ModalTableHandler";
import ModalTable from "../src/Components/Table/ModalTable";
import { ButtonEdit } from "../src/Components/Table/ModalTableButtonsAll";
import AltaBajaLogica from "../src/Components/Table/AltaBajaLogica";
import {
  VehiculoApiParser,
  type VehiculoSchemaType,
} from "../types/Vehiculo.schema";
import z from "zod";

const headers = [
  "Marca",
  "Modelo",
  "Año",
  "Patente",
  "Numero de Chasis",
  "Numero de Motor",
  "Estado",
];
const colWidths = ["90px", "100px", "50px", "65px", "200px", "150px", "70px"];

export default function VehiculosListar() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedModelo, setSelectedModelo] = useState<string>("");
  const [selectedPatente, setSelectedPatente] = useState<string>("");
  const [selectedEstado, setSelectedEstado] =
    useState<boolean>(
      true
    ); /*ACA HAY Q HACER LA FUNCION DE LOS BOTONES DE ALTA Y BAJA*/
  const handleRowClick = (
    id: string,
    modelo?: string,
    patente?: string,
    estadoStr?: string
  ) => {
    setSelectedId(id);
    setSelectedModelo(modelo || "");
    setSelectedPatente(patente || "");
    setSelectedEstado(estadoStr === "true");
    setShowModal(true);
  };
  const [data, setData] = useState<VehiculoSchemaType[]>([]);
  useEffect(() => {
    fetch(endpoints.vehiculos.listar.action, {
      method: endpoints.vehiculos.listar.method,
    })
      .then((response) => response.json())
      .then((data) => {
        const vehiculosParser = z.array(VehiculoApiParser);
        const vehiculos: VehiculoSchemaType[] = vehiculosParser.parse(data);
        setData(vehiculos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const tableData = data.map((vehiculo: VehiculoSchemaType) => (
    <tr
      key={vehiculo.idVehiculo}
      onClick={ModalTableHandler(handleRowClick, [
        "modelo",
        "patente",
        "estado",
      ])}
      style={{ cursor: "pointer", textAlign: "center" }}
      data-id={vehiculo.idVehiculo}
      data-modelo={vehiculo.Modelo}
      data-patente={vehiculo.Patente}
      data-estado={vehiculo.Estado}>
      <td>{vehiculo.Marca}</td>
      <td>{vehiculo.Modelo}</td>
      <td>{vehiculo.Anio}</td>
      <td>{vehiculo.Patente}</td>
      <td>{vehiculo.NumeroChasis}</td>
      <td>{vehiculo.NumeroMotor}</td>
      <td>{vehiculo.Estado ? "Activo" : "Inactivo"}</td>
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
          onClose={() => setShowModal(false)}>
          <ButtonEdit
            id={selectedId ? selectedId : ""}
            method={endpoints.vehiculos.buscarPorId.method}
            endpoint={endpoints.vehiculos.buscarPorId.action(
              selectedId ? parseInt(selectedId) : 0
            )}
          />
          <AltaBajaLogica
            estado={selectedEstado}
            methodAlta={endpoints.vehiculos.altaLogica.method}
            endpointBaja={endpoints.vehiculos.bajaLogica.action(
              selectedId ? parseInt(selectedId) : 0
            )}
            methodBaja={endpoints.vehiculos.bajaLogica.method}
            endpointAlta={endpoints.vehiculos.altaLogica.action(
              selectedId ? parseInt(selectedId) : 0
            )}
            onChange={(nuevoEstado) => {
              setSelectedEstado(nuevoEstado);
              // Hay que actualizar el estado en la tabla tambien, sino no se ve el cambio hasta ctrl+F5
              setData((prevData) =>
                prevData.map((vehiculo) =>
                  String(vehiculo.idVehiculo) === selectedId
                    ? { ...vehiculo, Estado: nuevoEstado }
                    : vehiculo
                )
              );
              setShowModal(false);
            }}
          />
        </ModalTable>
      </TableContainer>
      <NavButtonPosition />
    </>
  );
}
