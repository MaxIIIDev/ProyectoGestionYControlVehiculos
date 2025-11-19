import FormBrowser from "../src/Components/FormBuscador/FormBrowser";
import GeneralContainer from "../src/Components/FormBuscador/GeneralContainer";
import ResultInfo from "../src/Components/FormBuscador/ResultInfo";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import Enrouters from "../src/Components/Routes/Enrouters";
import { Button } from "react-bootstrap";

export default function VehiculosDocumentos() {
  return (
    <>
      <GeneralContainer title="Gestión de Documentos de Vehículos">
        <FormBrowser
          searchApiUrl={Enrouters.vehiculos.buscarPorPatenteLike.action("")}
          searchApiMethod={Enrouters.vehiculos.buscarPorPatenteLike.method}
          relatedApiUrl={(vehicle) =>
            Enrouters.documentos.buscarPorVehiculoId.action(vehicle.idVehiculo)
          }
          relatedApiMethod={Enrouters.documentos.buscarPorVehiculoId.method}
          entityLabel="Vehiculo"
          defaultOption="Buscar vehículo por patente"
          renderEntity={(vehicle) => (
            <ResultInfo
              title="Vehículo"
              info={[
                { label: "Marca", value: vehicle.marca },
                { label: "Modelo", value: vehicle.modelo },
                { label: "Año", value: vehicle.anio },
                { label: "Patente", value: vehicle.patente },
              ]}
            />
          )}
          renderRelated={(docs) => {
            // ACA PONEMOS LOS TIPoS DE DOCUMENTOS REQUERIDOS
            const tiposRequeridos = [
              { tipo: "Tarjeta Verde", label: "Tarjeta Verde" },
              { tipo: "Frente Poliza", label: "Frente Póliza" },
              { tipo: "Titulo", label: "Título" },
            ];

            // ACA LOS VERIFICAMOS PARA LUEGO MOSTRAR CARGAS PENDIENTES
            const tieneTipo = (tipo: string) =>
              docs.some(
                (doc: any) => doc.tipo?.toLowerCase() === tipo.toLowerCase()
              );

            return (
              <div className="d-flex flex-column gap-2">
                {/* CARGAMOS DOCUMENTOS EXISTENTES SI LOS HAY */}
                {docs.map((doc: any, idx: number) => (
                  <div
                    key={doc.idDocumento ?? idx}
                    className="d-flex align-items-center border rounded p-2 gap-3"
                  >
                    <span>
                      <strong>Tipo:</strong> {doc.tipo}
                    </span>

                    <span>
                      <strong>Vencimiento:</strong> {doc.fechaVencimiento}
                    </span>

                    <Button
                      variant="primary"
                      href={doc.urlDocumento}
                      target="_blank"
                      size="sm"
                    >
                      Ver Documento
                    </Button>
                  </div>
                ))}

                {/* ACA HABILITAMOS LOS DIVS PARA CARGAR DOCUMENTOS REQUERIDOS NO PRESENTES */}
                {tiposRequeridos.map((req) =>
                  !tieneTipo(req.tipo) ? (
                    <div
                      key={req.tipo}
                      className="d-flex align-items-center border rounded p-2 gap-3 bg-light"
                    >
                      <span>
                        <strong>{req.label}:</strong> No cargada
                      </span>
                      <Button variant="success" size="sm">
                        Cargar
                      </Button>
                    </div>
                  ) : null
                )}

                {/* ESTE ES POR SI HACE FALTA CARGAR ALGUNA COSA MAS */}
                <div className="d-flex align-items-center border rounded p-2 gap-3 bg-light">
                  <span>
                    <strong>Agregar documentación adicional:</strong>
                  </span>
                  <Button variant="secondary" size="sm">
                    Agregar
                  </Button>
                </div>
              </div>
            );
          }}
        />

        <NavButtonPosition />
      </GeneralContainer>
    </>
  );
}
