import { useEffect, useState } from "react";
import {
  VehiculoApiParser,
  type VehiculoSchemaType,
} from "../../types/Vehiculo.schema";
import {
  NeumaticoApiParser,
  type NeumaticoType,
} from "../../types/Neumatico.schema";
import TableContainer from "../../src/Components/Table/TableContainer";
import FormCard from "../../src/Components/Form/FormCard";
import TableResponsive from "../../src/Components/Table/TableResponsive";
import ComboBoxBrowser from "../../src/Components/FormBuscador/ComboBoxBrowser";
import endpointsAPI from "../../src/Components/Routes/Enrouters";
import z from "zod";
import Swal from "sweetalert2";

export const AsignarNeumaticos = () => {
  const [vehiculo, setVehiculo] = useState<VehiculoSchemaType | null>();
  const [neumaticosAvailable, setNeumaticosAvailable] = useState<
    NeumaticoType[]
  >([]);
  const [neumaticosAssigned, setNeumaticosNeumaticosAssigned] = useState<
    NeumaticoType[]
  >([]);
  const [reload, setReload] = useState(1);
  useEffect(() => {
    if (vehiculo == null) {
      return;
    }
    try {
      const searchAvailableNeumaticos = async () => {
        const responseFromApi = await fetch(
          endpointsAPI.neumaticos.obtenerTodosLosNeumaticosNoAsignados.action(),
          {
            method:
              endpointsAPI.neumaticos.obtenerTodosLosNeumaticosNoAsignados
                .method,
          },
        );
        if (!responseFromApi.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const dataFromApi = await responseFromApi.json();
        const neumaticosParser = z.array(NeumaticoApiParser);
        const neumaticosParsedFromApi: NeumaticoType[] =
          neumaticosParser.parse(dataFromApi);
        setNeumaticosAvailable(neumaticosParsedFromApi);
      };
      const searchNoAvailableNeumaticos = async () => {
        const responseFromApi = await fetch(
          endpointsAPI.neumaticos.obtenerTodosLosNeumaticosAsignadosAVehiculo.action(
            vehiculo!.idVehiculo!,
          ),
          {
            method:
              endpointsAPI.neumaticos
                .obtenerTodosLosNeumaticosAsignadosAVehiculo.method,
          },
        );
        if (!responseFromApi.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const dataFromApi = await responseFromApi.json();
        const neumaticosParser = z.array(NeumaticoApiParser);
        const neumaticosParsedFromApi: NeumaticoType[] =
          neumaticosParser.parse(dataFromApi);
        setNeumaticosNeumaticosAssigned(neumaticosParsedFromApi);
      };
      searchNoAvailableNeumaticos();
      searchAvailableNeumaticos();
    } catch (error) {
      console.log(error);
    }
  }, [vehiculo?.idVehiculo, reload]);
  useEffect(() => {
    console.log("NEUMATICOS NO AVAILABLE:", neumaticosAssigned);
  }, [neumaticosAssigned]);
  useEffect(() => {
    console.log("NEUMATICOS AVAILABLE:", neumaticosAvailable);
  }, [neumaticosAvailable]);
  const tableDataAvailableNeumaticos = neumaticosAvailable.map((neumatico) => (
    <tr
      key={neumatico.IdNeumatico}
      style={{ cursor: "pointer", textAlign: "center" }}>
      <td>{neumatico.NroSerie}</td>
      <td>{neumatico.Marca}</td>

      <td>
        <button
          className="btn btn-primary"
          onClick={async () => {
            try {
              const okFromApi = await fetch(
                endpointsAPI.neumaticos.asignarNeumaticos.action(
                  vehiculo!.idVehiculo!,
                  neumatico.IdNeumatico!,
                ),
                {
                  method: endpointsAPI.neumaticos.asignarNeumaticos.method,
                },
              );
              if (!okFromApi.ok) {
                throw new Error("Error en la respuesta del servidor");
              }
              Swal.fire({
                title: "Neumatico asignado con éxito",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Aceptar ",
              });
            } catch (error) {
              Swal.fire({
                title: "Error al asignar el neumatico",
                text:
                  error instanceof Error
                    ? error.message
                    : "Ha ocurrido un error inesperado",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
              return;
            }

            setReload(reload + 1);
          }}>
          Asignar
        </button>
      </td>
    </tr>
  ));
  const tableDataAssignedNeumaticos = () => {
    if (neumaticosAssigned == null || neumaticosAssigned.length == 0) {
      return (
        <tr>
          <td>No hay neumaticos asignados</td>
        </tr>
      );
    }
    console.log("continuo");
    const tableDataAssignedNeumaticos = neumaticosAssigned.map((neumatico) => (
      <tr
        key={neumatico.IdNeumatico}
        style={{ cursor: "pointer", textAlign: "center" }}>
        <td>{neumatico.NroSerie}</td>
        <td>{neumatico.Marca}</td>
        <td>
          <button
            onClick={async () => {
              try {
                const okFromApi = await fetch(
                  endpointsAPI.neumaticos.borrarAsignacion.action(
                    neumatico.IdNeumatico!,
                  ),
                  {
                    method: endpointsAPI.neumaticos.borrarAsignacion.method,
                  },
                );
                if (!okFromApi.ok) {
                  throw new Error("Error en la respuesta del servidor");
                }
                Swal.fire({
                  title: "Neumatico desasignado con éxito",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonText: "Aceptar ",
                });
              } catch (error) {
                Swal.fire({
                  title: "Error al desasignar el neumatico",
                  text:
                    error instanceof Error
                      ? error.message
                      : "Ha ocurrido un error inesperado",
                  icon: "error",
                  confirmButtonText: "Aceptar",
                });
              }

              setReload(reload + 1);
            }}
            className="btn btn-danger">
            Desasignar
          </button>
        </td>
      </tr>
    ));
    return tableDataAssignedNeumaticos;
  };
  return (
    <>
      <FormCard title="Gestor de Neumaticos">
        <FormCard title="Buscar Vehiculo">
          <ComboBoxBrowser
            apiUrl={endpointsAPI.vehiculos.buscarPorPatenteLike.action("")}
            apiMethod={endpointsAPI.vehiculos.buscarPorPatenteLike.method}
            onEntitySelect={(value: { [key: string]: string }) => {
              if (value != null) {
                setVehiculo(VehiculoApiParser.parse(value));
              } else {
                setVehiculo(null);
              }
            }}
            defaultOption="Buscador por Patente"
            name="patente"
            placeholder="Buscador por Patente"></ComboBoxBrowser>
        </FormCard>
        {/* El bloque de abajo aparece una vez seleccionado el vehiculo*/}
        {vehiculo && (
          <div
            className=" container-fluid mt-4"
            style={{
              display: "flex",
              flexDirection: "row",
            }}>
            {neumaticosAssigned.length > 0 ? (
              <FormCard
                title="Neumaticos Asignados"
                classNameCard=""
                styleCard={{ flex: 1, marginRight: "20px" }}>
                <TableContainer title="">
                  <TableResponsive
                    headerTitle={["Nro Serie", "Marca", "Accion"]}
                    colWidths={["15px", "20px", "20px"]}
                    tableData={tableDataAssignedNeumaticos()}></TableResponsive>
                </TableContainer>
              </FormCard>
            ) : (
              <FormCard
                title="Neumaticos Asignados"
                classNameCard=""
                styleCard={{ flex: 1, marginRight: "20px" }}>
                <TableContainer title="">
                  <TableResponsive
                    headerTitle={["No hay neumaticos asignados"]}
                    tableData={[
                      <tr key={0}>
                        <td style={{ textAlign: "center" }}>
                          No hay neumaticos asignados
                        </td>
                      </tr>,
                    ]}></TableResponsive>
                </TableContainer>
              </FormCard>
            )}
            {tableDataAvailableNeumaticos.length > 0 ? (
              <FormCard title="Neumaticos Disponibles" styleCard={{ flex: 1 }}>
                <TableContainer title="">
                  <TableResponsive
                    colWidths={["15px", "20px", "20px"]}
                    headerTitle={["Nro Serie", "Marca", "Accion"]}
                    tableData={tableDataAvailableNeumaticos}></TableResponsive>
                </TableContainer>
              </FormCard>
            ) : (
              <FormCard
                title="Neumaticos Disponibles"
                classNameCard=""
                styleCard={{ flex: 1 }}>
                <TableContainer title="">
                  <TableResponsive
                    headerTitle={["No hay neumaticos disponibles"]}
                    tableData={[
                      <tr key={0}>
                        <td style={{ textAlign: "center" }}>
                          No hay neumaticos disponibles en stock
                        </td>
                      </tr>,
                    ]}></TableResponsive>
                </TableContainer>
              </FormCard>
            )}
          </div>
        )}
      </FormCard>
    </>
  );
};
