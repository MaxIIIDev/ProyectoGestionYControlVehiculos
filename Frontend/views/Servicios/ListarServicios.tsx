import TableContainer from "../../src/Components/Table/TableContainer";
import TableResponsive from "../../src/Components/Table/TableResponsive";
import { type PaginaResponseType } from "../../types/PaginaResponse.Type";
import { useEffect, useState } from "react";
import NavButtonPosition from "../../src/Components/NavButtonPosition";
//import ModalTableHandler from "../../src/Components/Functions/ModalTableHandler";
import ModalTable from "../../src/Components/Table/ModalTable";
import "../../src/Components/css/BotonModal.css";
import { PaginatorForTable } from "../../src/Components/Table/Paginator";
import endpointsAPI from "../../src/Components/Routes/Enrouters";
import {
  ListadoServiceApiParser,
  PagedResponseSchema,
  type ListadoServiceType,
} from "../../types/ListadoServices.schema";
import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";
import { ParserDatesToStringDateOnly } from "../../src/Utils/ParserDatesToStringMessage";
import FormCard from "../../src/Components/Form/FormCard";
import GeneralContainer from "../../src/Components/FormBuscador/GeneralContainer";
import { Button } from "react-bootstrap";
import ResultInfo from "../../src/Components/FormBuscador/ResultInfo";
import "../../src/Components/css/FocosTabla.css";

export default function ListarServicios() {
  const [idBuscar, setIdBuscar] = useState<string>("");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<any>(null);

  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [metadataPage, setMetadataPage] = useState<
    PaginaResponseType<ListadoServiceType>
  >({
    data: [],
    totalPaginasCalculadas: 0,
    paginaActual: 1,
    tamanoPaginas: 10,
  });
  const headers = [<div className="d-flex justify-content-center">Fecha</div>];
  const colWidths = ["15%"];

  useEffect(() => {
    console.log("Disparando useEffect", idBuscar, currentPage);
    if (!idBuscar) {
      setMetadataPage({
        data: [],
        totalPaginasCalculadas: 0,
        paginaActual: 1,
        tamanoPaginas: 10,
      });
      return;
    }
    fetch(
      `${endpointsAPI.mantenimiento.listarPorVehiculoId.action(
        idBuscar ? parseInt(idBuscar) : 0
      )}?nroPagina=${currentPage}&tamanoPagina=10`,
      { method: endpointsAPI.mantenimiento.listarPorVehiculoId.method }
    )
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("RESPONSE", apiResponse);
        const chklstParser = PagedResponseSchema.parse(apiResponse);
        const chcklst: ListadoServiceType[] = chklstParser.items.map((item) =>
          ListadoServiceApiParser.parse(item)
        );
        if (apiResponse.length !== 0) {
          setMetadataPage({
            data: chcklst,
            totalPaginasCalculadas: chklstParser.totalPaginasCalculadas,
            paginaActual: chklstParser.paginaActual,
            tamanoPaginas: chklstParser.tamanoPaginas,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, idBuscar]);
  useEffect(() => {
    console.log(
      "Total paginas calculadas cambiaron a:",
      metadataPage.totalPaginasCalculadas
    );
    console.log("Tipo de dato: " + metadataPage.totalPaginasCalculadas);
  }, [metadataPage.totalPaginasCalculadas]);
  const dataOrdenada = [...metadataPage.data].sort((a, b) => {
    if (!a.Fecha) return 1;
    if (!b.Fecha) return -1;
    return new Date(b.Fecha).getTime() - new Date(a.Fecha).getTime();
  });
  const tableData = dataOrdenada.map((serv: ListadoServiceType) => (
    <tr
      key={serv.IdService}
      style={{ cursor: "pointer", textAlign: "center" }}
      data-id={serv.IdService}
      data-fecha={serv.Fecha}
      data-proveedor={serv.Proveedor}
      data-realizado={serv.Realizado}
    >
      <td>
        {serv.Fecha ? ParserDatesToStringDateOnly(new Date(serv.Fecha)) : ""}
      </td>
      <td>{serv.Proveedor}</td>
      <td>
        {serv.Realizado ? (
          <Button
            className="boton-modal border-0 p-1 m-0 w-75 rounded-1"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Ver
          </Button>
        ) : (
          <Button
            className="boton-modal border-0 p-1 m-0 w-75 rounded-1"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Realizado
          </Button>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <GeneralContainer title="Listado de Service por Vehículo">
        <FormCard
          title="Buscar Vehículo por Patente"
          classNameCard="bg-dark text-white m-3 rounded-5"
          classNameHeader="fs-4 text-white text-center border-0 rounded-5"
          classNameBody="fs-5 text-center"
          styleCard={{ maxWidth: "90%", maxHeight: "90%", padding: "20px" }}
        >
          <ComboBoxBrowser
            apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
            apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
            onEntitySelect={(vehiculo) => {
              console.log("Vehiculo seleccionado:", vehiculo);
              setIdBuscar(vehiculo ? vehiculo.idVehiculo : "");
              setVehiculoSeleccionado(vehiculo);
            }}
            placeholder="Busqueda por Patente"
          />
        </FormCard>
        {/* Tabla de Checklists debe aparecer solo si se ha seleccionado un vehículo */}
        {vehiculoSeleccionado && (
          <>
            <ResultInfo
              title="Vehiculo Seleccionado:"
              info={[
                { label: "Marca", value: vehiculoSeleccionado.marca },
                { label: "Modelo", value: vehiculoSeleccionado.modelo },
                { label: "Año", value: vehiculoSeleccionado.anio },
                { label: "Patente", value: vehiculoSeleccionado.patente },
              ]}
            />
            <TableContainer>
              {metadataPage.data.length > 0 ? (
                <TableResponsive
                  tableData={tableData}
                  headerTitle={headers}
                  colWidths={colWidths}
                />
              ) : (
                <div className="text-center py-4 text-danger">
                  No hay Services para el vehículo seleccionado.
                </div>
              )}
            </TableContainer>
          </>
        )}
        {metadataPage.data.length > 0 && vehiculoSeleccionado && (
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
        )}
        <NavButtonPosition />
        <ModalTable
          onClose={() => setShowModal(false)}
          show={showModal}
          title="Datos del Servicio"
          children={
            <textarea
              id="observaciones-textarea"
              className="form-control"
              rows={10}
              readOnly
              value={""}
            ></textarea>
          }
        />
      </GeneralContainer>
    </>
  );
}
