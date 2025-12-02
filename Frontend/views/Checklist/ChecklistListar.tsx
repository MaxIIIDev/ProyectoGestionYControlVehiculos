import FormBrowser from "../../src/Components/FormBuscador/FormBrowser";
import GeneralContainer from "../../src/Components/FormBuscador/GeneralContainer";
import ResultInfo from "../../src/Components/FormBuscador/ResultInfo";
import NavButtonPosition from "../../src/Components/NavButtonPosition";
import Enrouters from "../../src/Components/Routes/Enrouters";
import { useEffect, useState } from "react";
import TableContainer from "../../src/Components/Table/TableContainer";
import TableResponsive from "../../src/Components/Table/TableResponsive";
import "../../src/Components/css/BotonModal.css";
import { ParserDatesToStringDateOnly } from "../../src/Utils/ParserDatesToStringMessage";
import { Button } from "react-bootstrap";
import { PaginatorForTable } from "../../src/Components/Table/Paginator";

export default function ChecklistListar() {
  const [idVehiculo, setIdVehiculo] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [chcklst, setChcklst] = useState<Array<any>>([]);

  // PAGINAS CALCLULO
  const totalPaginasCalculadas = Math.max(
    1,
    Math.ceil(chcklst.length / itemsPerPage)
  );

  // BUSCO CHKCLSTS POR VEHICULOI ID
  useEffect(() => {
    if (idVehiculo) {
      fetch(Enrouters.checklist.listarPorVehiculoId.action(idVehiculo))
        .then((res) => res.json())
        .then((data) => {
          setChcklst(data);
          setCurrentPage(1);
        });
    } else {
      setChcklst([]);
    }
  }, [idVehiculo]);

  const entity = "Vehiculo";

  const handleVehiculoSelect = (vehiculo: {
    [key: string]: string | number;
  }) => {
    console.log("Vehículo seleccionado:", vehiculo);
    setIdVehiculo(parseInt(vehiculo.idVehiculo.toString()));
  };

  return (
    <>
      <GeneralContainer title="Gestión de Checklists">
        <FormBrowser
          searchApiUrl={Enrouters.vehiculos.buscarPorPatenteLike.action("")}
          searchApiMethod={Enrouters.vehiculos.buscarPorPatenteLike.method}
          relatedApiUrl={(vehicle) =>
            Enrouters.checklist.listarPorVehiculoId.action(vehicle.idVehiculo!)
          }
          relatedApiMethod={Enrouters.checklist.listarPorVehiculoId.method}
          entityLabel={entity}
          defaultOption="Buscar vehículo por patente"
          onEntitySelect={handleVehiculoSelect}
          renderEntity={(vehicle) => (
            <ResultInfo
              title={entity}
              info={[
                { label: "Marca", value: vehicle.marca },
                { label: "Modelo", value: vehicle.modelo },
                { label: "Año", value: vehicle.anio },
                { label: "Patente", value: vehicle.patente },
              ]}
            />
          )}
          refresh={0}
          renderRelated={(chcklst) => (
            <TableContainer>
              <TableResponsive
                tableData={chcklst.map((item) => (
                  <tr key={item.idChecklistDiario} className="text-center">
                    <td>{ParserDatesToStringDateOnly(new Date(item.fecha))}</td>
                    <td>
                      {item.faroDelanteroIzquierdo ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.faroDelanteroDerecho ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.faroTraseroIzquierdo ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.faroTraseroDerecho ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.liquidoFrenos ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.nivelAceite ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.presionNeumaticos ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>

                    <td>
                      {item.nivelRefrigerante ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.nivelAguaParabrisas ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.matafuegoVigente ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#75FB4C"
                        >
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#da6b67ff"
                        >
                          <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                        </svg>
                      )}
                    </td>
                    <td>
                      {item.observaciones.length > 0 ? (
                        <Button className="boton-modal border-0 p-1 m-0 w-75 rounded-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#75FB4C"
                          >
                            <path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                          </svg>
                        </Button>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#D16D6A"
                        >
                          <path d="M240-800v200-200 640-9.5 9.5-640Zm0 720q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v174q-19-7-39-10.5t-41-3.5v-120H520v-200H240v640h254q8 23 20 43t28 37H240Zm396-20-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Z" />
                        </svg>
                      )}
                    </td>
                    {/* Agrega más <td> para otros campos si quieres */}
                  </tr>
                ))}
                headerTitle={[
                  <div className="d-flex justify-content-center">Fecha</div>,
                  <div className="d-flex justify-content-center gap-2">
                    <i className="bi bi-lightbulb"></i>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <defs>
                        <filter
                          id="destello-amarillo"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="1.5"
                            result="blur"
                          />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <path d="M5 18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5z" />

                      <path
                        d="M4 6 v6 h6 V6 z"
                        fill="#FFD700"
                        stroke="none"
                        filter="url(#destello-amarillo)"
                      />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center gap-2">
                    <i className="bi bi-lightbulb"></i>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <defs>
                        <filter
                          id="destello-amarillo"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="1.5"
                            result="blur"
                          />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <path d="M5 18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5z" />

                      <path
                        d="M14 6 v6 h6 V6 z"
                        fill="#FFD700"
                        stroke="none"
                        filter="url(#destello-amarillo)"
                      />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center gap-2">
                    <i className="bi bi-lightbulb"></i>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <defs>
                        <filter
                          id="destello-amarillo"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="1.5"
                            result="blur"
                          />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <path d="M5 18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5z" />

                      <path
                        d="M4 12 v6 h6 v-6 z"
                        fill="#FFD700"
                        stroke="none"
                        filter="url(#destello-amarillo)"
                      />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center gap-2">
                    <i className="bi bi-lightbulb"></i>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <defs>
                        <filter
                          id="destello-amarillo"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="1.5"
                            result="blur"
                          />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <path d="M5 18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5z" />

                      <path
                        d="M14 12 v6 h6 v-6 z"
                        fill="#FFD700"
                        stroke="none"
                        filter="url(#destello-amarillo)"
                      />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e85a5aff"
                    >
                      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="M160-120q-17 0-28.5-11.5T120-160q0-17 11.5-28.5T160-200h40v-240h-40q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h40v-240h-40q-17 0-28.5-11.5T120-800q0-17 11.5-28.5T160-840h640q17 0 28.5 11.5T840-800q0 17-11.5 28.5T800-760h-40v240h40q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440h-40v240h40q17 0 28.5 11.5T840-160q0 17-11.5 28.5T800-120H160Zm120-80h400v-240q-17 0-28.5-11.5T640-480q0-17 11.5-28.5T680-520v-240H280v240q17 0 28.5 11.5T320-480q0 17-11.5 28.5T280-440v240Zm200-120q50 0 85-34.5t35-83.5q0-39-22.5-67T480-620q-75 86-97.5 114.5T360-438q0 49 35 83.5t85 34.5ZM280-200v-560 560Z" />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="M760-640q-17 0-28.5-11.5T720-680q0-8 3.5-15.5T732-708q12-12 55-27l43-15q-8 23-15 43-6 17-13.5 33T788-652q-5 5-12.5 8.5T760-640ZM160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h240q33 0 56.5 23.5T480-760v327q9-3 19-5t21-2q50 0 85 35t35 85v80q0 17 11.5 28.5T680-200q17 0 28.5-11.5T720-240v-200h-40v-57q-54-23-87-72t-33-111q0-83 58.5-141.5T760-880q83 0 141.5 58.5T960-680q0 62-33 111t-87 72v57h-40v200q0 50-35 85t-85 35q-50 0-85-35t-35-85v-80q0-17-11.5-28.5T520-360q-17 0-28.5 11.5T480-320v120q0 33-23.5 56.5T400-120H160Zm600-440q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM160-200h240v-80l-80 80v-113l80-80v-87l-80 80v-113l80-80v-87l-80 80v-113l47-47H193l47 47v113l-80-80v87l80 80v113l-80-80v87l80 80v113l-80-80v80Zm120-280Z" />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="M450-240h60v-87l68 69 43-43-111-111v-38h37l111 112 43-43-69-69h88v-60h-88l69-68-43-43-111 111h-37v-37l111-111-43-43-68 69v-88h-60v88l-69-69-43 43 112 111v37h-38L301-621l-43 43 69 68h-87v60h87l-69 69 43 43 111-112h38v38L338-301l43 43 69-69v87Zm30 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="M480-800q100 0 208.5 16T926-733l-87 461-78-15 73-387q-104-24-190-35t-164-11q-78 0-164 11t-190 35l73 387-78 15-87-461q129-35 237.5-51T480-800Zm201 662-66-44 13-21q6-9 9-18.5t3-20.5q0-14-5-27t-15-23q-21-21-32.5-48.5T576-398q0-23 6.5-44t18.5-40l13-20 67 44-14 21q-6 9-8.5 18.5T656-398q0 14 5 27t15 23q21 21 32.5 48.5T720-242q0 23-6.5 44T695-158l-14 20Zm-168 0-66-44 13-21q6-9 9-18.5t3-20.5q0-14-5-27t-15-23q-21-21-32.5-48.5T408-398q0-23 6.5-44t18.5-40l13-20 67 44-14 21q-6 9-8.5 18.5T488-398q0 14 5 27t15 23q21 21 32.5 48.5T552-242q0 23-6.5 44T527-158l-14 20Zm-167 0-67-44 14-21q6-9 9-18.5t3-20.5q0-14-5.5-27T284-292q-21-21-32.5-48.5T240-398q0-23 6-44t19-40l14-20 67 44-14 21q-6 8-9 18t-3 21q0 14 5 27t15 23q21 21 32.5 48.5T384-242q0 23-6.5 44T359-158l-13 20Z" />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="M279-240v-241l10-39h380l10 39v241H279Zm81-200v120h240v-120H360Zm119-281q17 0 28.5-11.5T519-761q0-17-11.5-28.5T479-801q-17 0-28.5 11.5T439-761q0 17 11.5 28.5T479-721Zm161-17v-46l-42 8q1 4 1 7.5v15q0 3.5-1 7.5l42 8ZM279-481q0-63 35-113t91-72q-11-8-19.5-18.5T371-708l-171-33v-40l171-33q15-30 43.5-49t64.5-19q23 0 44 9t37 23l160-31v240l-160-31q-2 2-3.5 3t-3.5 3q56 22 91 72t35 113h-79q0-50-35-84.5T480-600q-50 0-85 34.5T360-481h-81Zm80 401q-33 0-56.5-23.5T279-160v-80h81v80h240v-80h79v80q0 33-23.5 56.5T599-80H359Z" />
                    </svg>
                  </div>,
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720ZM480-220q-120 0-217.5-71T120-480q45-118 142.5-189T480-740q120 0 217.5 71T840-480q-45 118-142.5 189T480-220Zm0-80q88 0 161-48t112-132q-39-84-112-132t-161-48q-88 0-161 48T207-480q39 84 112 132t161 48Zm0-40q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-80q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40Zm800 0v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80ZM480-480Z" />
                    </svg>
                  </div>,
                ]}
                colWidths={["15%"]}
              />
            </TableContainer>
          )}
        />
        {/* Hasta aca llegaria lo que seria la pagina, Este bonton seria el volver */}
        <PaginatorForTable
          totalCountPages={totalPaginasCalculadas}
          currentPage={currentPage}
          previousPage={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          nextPage={() => {
            if (currentPage < totalPaginasCalculadas)
              setCurrentPage(currentPage + 1);
          }}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
        <NavButtonPosition />
      </GeneralContainer>
    </>
  );
}
