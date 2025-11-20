import FormBrowser from "../src/Components/FormBuscador/FormBrowser";
import GeneralContainer from "../src/Components/FormBuscador/GeneralContainer";
import ResultInfo from "../src/Components/FormBuscador/ResultInfo";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import Enrouters from "../src/Components/Routes/Enrouters";
import DocumentosHandler from "../src/Components/FormBuscador/DocumentosVehiculosHandler";

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
          renderRelated={(docs) => <DocumentosHandler docs={docs} />}
        />
        <NavButtonPosition />
      </GeneralContainer>
    </>
  );
}
