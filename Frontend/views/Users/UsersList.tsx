import { useEffect, useState } from "react";
import ModalTable from "../../src/Components/Table/ModalTable";
import { PaginatorForTable } from "../../src/Components/Table/Paginator";
import TableContainer from "../../src/Components/Table/TableContainer";
import TableResponsive from "../../src/Components/Table/TableResponsive";
import { UsuarioApiParser, type UsuarioType } from "../../types/Usuario.schema";
import { type PaginaResponseType } from "../../types/PaginaResponse.Type";
import endpointsAPI from "../../src/Components/Routes/Enrouters";
import z from "zod";
import AltaBajaLogica from "../../src/Components/Table/AltaBajaLogica";
import Swal from "sweetalert2";
export default function UsersList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [metadataPage, setMetadataPage] = useState<
    PaginaResponseType<UsuarioType>
  >({
    data: [],
    totalPaginasCalculadas: 0,
    paginaActual: 1,
    tamanoPaginas: 10,
  });
  const handleRowClick = (usuario: UsuarioType) => {
    setSelectedUser(usuario);
    setShowModal(true);
  };
  const handleError = (error: unknown) => {
    Swal.fire({
      title: "Error al cargar los usuarios",
      text:
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado",
      icon: "error",
      showCloseButton: true,
    });
  };
  const tableData = metadataPage.data.map((usuario: UsuarioType) => (
    <tr
      key={usuario.idUsuario}
      onClick={() => handleRowClick(usuario)}
      style={{ cursor: "pointer", textAlign: "center" }}>
      <td>{usuario.persona!.nombre}</td>
      <td>{usuario.persona!.apellido}</td>
      <td>{usuario.persona!.dni}</td>
      <td>{usuario.gmail}</td>
      <td>{usuario.rol?.nombre}</td>
      <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
    </tr>
  ));
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseFromApi = await fetch(
          endpointsAPI.usuarios.listar.action(currentPage, 10),
          {
            method: endpointsAPI.usuarios.listar.method,
          },
        );
        if (!responseFromApi.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const dataFromApi = await responseFromApi.json();
        console.log(dataFromApi);
        const usersParser = z.array(UsuarioApiParser);
        const usersParsedFromApi: UsuarioType[] = usersParser.parse(
          dataFromApi.items,
        );
        console.log("No paso");
        const dataParsed: PaginaResponseType<UsuarioType> = {
          data: usersParsedFromApi,
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
    fetchUsers();
  }, [currentPage]);
  return (
    <>
      <TableContainer title="Listado de Usuarios">
        <TableResponsive
          headerTitle={["Nombre", "Apellido", "DNI", "Gmail", "Rol", "Estado"]}
          tableData={tableData}></TableResponsive>
      </TableContainer>
      <ModalTable
        show={showModal}
        title={
          (selectedUser &&
            "Usuario: " +
              selectedUser.persona!.nombre +
              " " +
              selectedUser.persona!.apellido +
              " - Gmail: " +
              selectedUser.gmail +
              "- Rol: " +
              selectedUser.rol?.nombre) ||
          "Detalle de el usuario"
        }
        onClose={() => setShowModal(false)}>
        {selectedUser && (
          <>
            <AltaBajaLogica
              endpointAlta={endpointsAPI.usuarios.alta.action(
                selectedUser.idUsuario,
              )}
              methodAlta={endpointsAPI.usuarios.alta.method}
              endpointBaja={endpointsAPI.usuarios.baja.action(
                selectedUser.idUsuario,
              )}
              methodBaja={endpointsAPI.usuarios.baja.method}
              estado={selectedUser.estado}
              onChange={(nuevoEstado) => {
                selectedUser.estado = nuevoEstado;
                setMetadataPage((prevData) => ({
                  ...prevData,
                  data: prevData.data.map((usuario) => {
                    if (
                      String(usuario.idUsuario) ===
                      String(selectedUser.idUsuario)
                    ) {
                      return { ...usuario, estado: nuevoEstado };
                    }
                    return usuario;
                  }),
                }));
              }}></AltaBajaLogica>
          </>
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
        totalCountPages={
          metadataPage.totalPaginasCalculadas
        }></PaginatorForTable>
    </>
  );
}
