import TableContainer from "../../src/Components/Table/TableContainer";
import TableResponsive from "../../src/Components/Table/TableResponsive";
import { useEffect, useState } from "react";
import NavButtonPosition from "../../src/Components/NavButtonPosition";
import ModalTableHandler from "../../src/Components/Functions/ModalTableHandler";
import ModalTable from "../../src/Components/Table/ModalTable";
import { ButtonEdit } from "../../src/Components/Table/ModalTableButtonsAll";
import AltaBajaLogica from "../../src/Components/Table/AltaBajaLogica";
import {
  ListadoKilometrajeApiParser,
  type ListadoKilometrajeType,
} from "../../types/ListadoKilometraje.schema";
import { type PaginaResponseType } from "../../types/PaginaResponse.Type";
import z from "zod";
import { PaginatorForTable } from "../../src/Components/Table/Paginator";
import endpointsAPI, {
  endpointFront,
} from "../../src/Components/Routes/Enrouters";

import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";
import { ParserDatesToStringMessage } from "../../src/Utils/ParserDatesToStringMessage";
import FormCard from "../../src/Components/Form/FormCard";

const headers = ["Fecha de Registro", "Kilometraje", "Estado"];
const colWidths = ["100px", "100px", "100px"];

export default function KilometrosListar() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [selectedModelo, setSelectedModelo] = useState<string>("");
  const [selectedPatente, setSelectedPatente] = useState<string>("");
  const [patenteBuscar, setPatenteBuscar] = useState<string>("");
  const [selectedFechaRegistro, setSelectedFechaRegistro] =
    useState<string>("");
  const [selectedKilometraje, setSelectedKilometraje] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [metadataPage, setMetadataPage] = useState<
    PaginaResponseType<ListadoKilometrajeType>
  >({
    data: [],
    totalPaginasCalculadas: 0,
    paginaActual: 1,
    tamanoPaginas: 10,
  });
  const [selectedEstado, setSelectedEstado] = useState<boolean>(true);
  const handleRowClick = (
    id: string,
    marca?: string,
    modelo?: string,
    patente?: string,
    fechaRegistro?: string,
    kilometraje?: string,
    estadoStr?: string
  ) => {
    setSelectedId(id);
    setSelectedMarca(marca || "");
    setSelectedModelo(modelo || "");
    setSelectedPatente(patente || "");
    setSelectedFechaRegistro(fechaRegistro || "");
    setSelectedKilometraje(kilometraje || "");
    setSelectedEstado(estadoStr === "true");
    setShowModal(true);
  };

  useEffect(() => {
    console.log("Disparando useEffect", patenteBuscar, currentPage);
    if (!patenteBuscar) {
      setMetadataPage({
        data: [],
        totalPaginasCalculadas: 0,
        paginaActual: 1,
        tamanoPaginas: 10,
      });
      return;
    }
    fetch(
      `${endpointsAPI.controlKilometraje.listar.action(
        patenteBuscar
      )}?nroPagina=${currentPage}&tamanoPagina=10`,
      { method: endpointsAPI.controlKilometraje.listar.method }
    )
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("RESPONSE", apiResponse);
        const kilometrajeParser = z.array(ListadoKilometrajeApiParser);
        const kilometrajes: ListadoKilometrajeType[] =
          kilometrajeParser.parse(apiResponse);
        if (apiResponse.length !== 0) {
          setMetadataPage({
            data: kilometrajes,
            totalPaginasCalculadas: apiResponse[0].totalPaginasCalculadas,
            ...apiResponse,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, patenteBuscar]);
  useEffect(() => {
    console.log(
      "Total paginas calculadas cambiaron a:",
      metadataPage.totalPaginasCalculadas
    );
    console.log("Tipo de dato: " + metadataPage.totalPaginasCalculadas);
  }, [metadataPage.totalPaginasCalculadas]);
  const tableData = metadataPage.data.map(
    (kilometraje: ListadoKilometrajeType) => (
      <tr
        key={kilometraje.IdControlKilometraje}
        onClick={ModalTableHandler(handleRowClick, [
          "marca",
          "modelo",
          "patente",
          "fechaRegistro",
          "kilometraje",
          "estado",
        ])}
        style={{ cursor: "pointer", textAlign: "center" }}
        data-id={kilometraje.IdControlKilometraje}
        data-marca={kilometraje.Marca}
        data-modelo={kilometraje.Modelo}
        data-patente={kilometraje.Patente}
        data-fecharegistro={kilometraje.FechaRegistro}
        data-kilometraje={kilometraje.Kilometraje}
        data-estado={kilometraje.Estado}>
        <td>{kilometraje.FechaRegistro.toLocaleDateString()}</td>
        <td>{kilometraje.Kilometraje}</td>
        <td>{kilometraje.Estado ? "Activo" : "Inactivo"}</td>
      </tr>
    )
  );

  return (
    <>
      <FormCard
        title="Listado de Kilometrajes"
        classNameCard="bg-dark text-white rounded-5 p-3 "
        classNameHeader="fs-2 text-center"
        styleBody={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <FormCard
          title="Buscar Vehículo por Patente"
          classNameCard="bg-dark text-white m-3 rounded-5"
          classNameHeader="fs-4 text-white text-center border-0 rounded-5"
          classNameBody="fs-5 text-center"
          styleCard={{ maxWidth: "90%", maxHeight: "90%", padding: "20px" }}>
          <ComboBoxBrowser
            apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
            apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
            onEntitySelect={(vehiculo) => {
              console.log("Vehiculo seleccionado:", vehiculo);
              setPatenteBuscar(vehiculo ? vehiculo.patente : "");
            }}
            placeholder="Busqueda por Patente"
          />
        </FormCard>
        {patenteBuscar && metadataPage.data.length === 0 && (
          <FormCard
            title=""
            classNameCard="bg-danger text-black  rounded-5 border border-2 border-danger"
            classNameHeader=" invisible"
            classNameBody="text-center mb-3">
            <TableContainer
              title={
                "No hay registros para la patente seleccionada"
              }></TableContainer>
          </FormCard>
        )}
        {patenteBuscar && metadataPage.data.length !== 0 && (
          <FormCard
            title={
              "Listado de Registros: " +
              metadataPage.data[0].Marca +
              " " +
              metadataPage.data[0].Modelo +
              " - Patente: " +
              metadataPage.data[0].Patente
            }
            classNameCard="bg-dark text-white  rounded-5 "
            classNameHeader="text-center fs-4 fst-italic font-monospace text- p-3 bg-info bolder border border-2 border-info font-weight-bold text-black "
            classNameBody="p-4">
            <TableContainer>
              <TableResponsive
                headerTitle={headers}
                colWidths={colWidths}
                tableData={tableData}
              />
              <ModalTable
                show={showModal}
                title={
                  "Vehiculo: " +
                  selectedMarca +
                  " " +
                  selectedModelo +
                  " - " +
                  "Patente: " +
                  selectedPatente +
                  " - " +
                  "Fecha de Registro: " +
                  ParserDatesToStringMessage(new Date(selectedFechaRegistro)) +
                  " - " +
                  "Kilometraje: " +
                  selectedKilometraje +
                  "km"
                }
                onClose={() => setShowModal(false)}>
                {selectedFechaRegistro &&
                  new Date(Date.now())
                    .toLocaleDateString("es-AR")
                    .split("/")
                    .reverse()
                    .join("-") ===
                    new Date(selectedFechaRegistro)
                      .toLocaleDateString("es-AR")
                      .split("/")
                      .reverse()
                      .join("-") && (
                    <ButtonEdit
                      id={selectedId ? selectedId : "0"}
                      endpoint={endpointFront.controlKilometraje.actualizar.action(
                        selectedId ? parseInt(selectedId) : 0
                      )}
                    />
                  )}

                <AltaBajaLogica
                  estado={selectedEstado}
                  methodAlta={endpointsAPI.controlKilometraje.altaLogica.method}
                  endpointBaja={endpointsAPI.controlKilometraje.bajaLogica.action(
                    selectedId ? parseInt(selectedId) : 0
                  )}
                  methodBaja={endpointsAPI.controlKilometraje.bajaLogica.method}
                  endpointAlta={endpointsAPI.controlKilometraje.altaLogica.action(
                    selectedId ? parseInt(selectedId) : 0
                  )}
                  onChange={(nuevoEstado) => {
                    setSelectedEstado(nuevoEstado);
                    // Hay que actualizar el estado en la tabla tambien, sino no se ve el cambio hasta ctrl+F5
                    setMetadataPage((prevData) => ({
                      ...prevData,
                      data: prevData.data.map((controlKilometraje) =>
                        String(controlKilometraje.IdControlKilometraje) ===
                        String(selectedId)
                          ? { ...controlKilometraje, Estado: nuevoEstado }
                          : controlKilometraje
                      ),
                    }));
                    setShowModal(false);
                  }}
                />
              </ModalTable>
            </TableContainer>
            <PaginatorForTable
              totalCountPages={metadataPage.totalPaginasCalculadas}
              currentPage={metadataPage.paginaActual}
              previousPage={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              nextPage={() => {
                if (currentPage < metadataPage.totalPaginasCalculadas) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
              }}
            />

            <NavButtonPosition />
          </FormCard>
        )}
      </FormCard>
      {!(patenteBuscar && metadataPage.data.length !== 0) && (
        <NavButtonPosition />
      )}
    </>
  );
}
