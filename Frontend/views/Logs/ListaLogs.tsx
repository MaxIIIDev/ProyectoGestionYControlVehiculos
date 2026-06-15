import { useEffect, useState } from "react";
import ModalTable from "../../src/Components/Table/ModalTable";
import { PaginatorForTable } from "../../src/Components/Table/Paginator";
import TableContainer from "../../src/Components/Table/TableContainer";
import TableResponsive from "../../src/Components/Table/TableResponsive";
import {
  AuditoriaSchema,
  type AuditoriaType,
} from "../../types/Auditoria.schema";
import { type PaginaResponseType } from "../../types/PaginaResponse.Type";
import z from "zod";
import Swal from "sweetalert2";
import endpointsAPI from "../../src/Components/Routes/Enrouters";

export default function ListaLogs() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAuditoria, setSelectedAuditoria] =
    useState<AuditoriaType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [metadataPage, setMetadataPage] = useState<
    PaginaResponseType<AuditoriaType>
  >({
    data: [],
    totalPaginasCalculadas: 0,
    paginaActual: 1,
    tamanoPaginas: 10,
  });

  const handleRowClick = (auditoria: AuditoriaType) => {
    setSelectedAuditoria(auditoria);
    setShowModal(true);
  };

  const handleError = (error: unknown) => {
    Swal.fire({
      title: "Error al cargar las auditorías",
      text:
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado",
      icon: "error",
      showCloseButton: true,
    });
  };

  const tableData = metadataPage.data.map((auditoria: AuditoriaType) => (
    <tr
      key={auditoria.idAuditoria}
      onClick={() => handleRowClick(auditoria)}
      style={{ cursor: "pointer", textAlign: "center" }}>
      <td>{new Date(auditoria.fecha).toLocaleString()}</td>
      <td>{auditoria.entidad}</td>
      <td>{auditoria.idEntidad}</td>
      <td>{auditoria.accion}</td>
      <td>{auditoria.usuario?.gmail || `ID: ${auditoria.idUsuario}`}</td>
    </tr>
  ));

  useEffect(() => {
    const fetchAuditorias = async () => {
      try {
        const responseFromApi = await fetch(
          endpointsAPI.auditorias.listar.action(currentPage, 10),
          {
            method: endpointsAPI.auditorias.listar.method,
          },
        );

        if (!responseFromApi.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

        const dataFromApi = await responseFromApi.json();
        console.log(dataFromApi);

        const auditoriasParser = z.array(AuditoriaSchema);
        const auditoriasParsedFromApi: AuditoriaType[] = auditoriasParser.parse(
          dataFromApi.items,
        );

        const dataParsed: PaginaResponseType<AuditoriaType> = {
          data: auditoriasParsedFromApi,
          totalPaginasCalculadas: dataFromApi.totalPaginasCalculadas,
          tamanoPaginas: dataFromApi.tamanoPaginas,
          paginaActual: dataFromApi.paginaActual,
        };

        setMetadataPage(dataParsed);
      } catch (error) {
        handleError(error);
        return;
      }
    };

    fetchAuditorias();
  }, [currentPage]);

  return (
    <>
      <TableContainer title="Historial de Auditoría">
        <TableResponsive
          headerTitle={["Fecha", "Entidad", "ID Registro", "Acción", "Usuario"]}
          tableData={tableData}
        />
      </TableContainer>

      <ModalTable
        show={showModal}
        title={
          selectedAuditoria
            ? `Detalle de Auditoría #${selectedAuditoria.idAuditoria}`
            : "Detalle de la Auditoría"
        }
        onClose={() => setShowModal(false)}>
        {selectedAuditoria && (
          <div className="text-start p-3 bg-light rounded">
            <p className="mb-2">
              <strong>Fecha y Hora:</strong>{" "}
              {new Date(selectedAuditoria.fecha).toLocaleString()}
            </p>
            <p className="mb-2">
              <strong>Entidad Afectada:</strong> {selectedAuditoria.entidad}
            </p>
            <p className="mb-2">
              <strong>ID del Registro:</strong> {selectedAuditoria.idEntidad}
            </p>
            <p className="mb-2">
              <strong>Acción Realizada:</strong>{" "}
              <span className="badge bg-secondary">
                {selectedAuditoria.accion}
              </span>
            </p>
            <hr />
            <p className="mb-2">
              <strong>Responsable (Gmail):</strong>{" "}
              {selectedAuditoria.usuario?.gmail || "Desconocido"}
            </p>
            {selectedAuditoria.usuario?.persona && (
              <p className="mb-0">
                <strong>Nombre:</strong>{" "}
                {selectedAuditoria.usuario.persona.nombre}{" "}
                {selectedAuditoria.usuario.persona.apellido}
              </p>
            )}
          </div>
        )}
      </ModalTable>

      <PaginatorForTable
        nextPage={() => {
          if (currentPage < metadataPage.totalPaginasCalculadas) {
            setCurrentPage(currentPage + 1);
          }
        }}
        previousPage={() => {
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }}
        onPageChange={(newPage) => {
          setCurrentPage(newPage);
        }}
        currentPage={currentPage}
        totalCountPages={metadataPage.totalPaginasCalculadas}
      />
    </>
  );
}
