import FormBrowser from "../src/Components/FormBuscador/FormBrowser";
import GeneralContainer from "../src/Components/FormBuscador/GeneralContainer";
import ResultInfo from "../src/Components/FormBuscador/ResultInfo";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import Enrouters from "../src/Components/Routes/Enrouters";
import DocumentosVehiculosHandler from "../src/Components/FormBuscador/DocumentosVehiculosHandler";
import ContainerCargador from "../src/Components/CargadorDeArchivos/ContainerCargador";
import { useState } from "react";

export default function VehiculosDocumentos() {
  const [showCargador, setShowCargador] = useState(false);
  const [idVehiculo, setIdVehiculo] = useState<number | null>(null);
  const [tipoDoc, setTipoDoc] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const entity = "Vehiculo";

  const handleVehiculoSelect = (vehiculo: any) => {
    console.log("Vehículo seleccionado:", vehiculo);
    setIdVehiculo(vehiculo.idVehiculo);
  };
  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const handleCargar = (tipo: string) => {
    setTipoDoc(tipo);
    setShowCargador(true);
  };
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
          refresh={refreshKey}
          renderRelated={(docs: any) => (
            <DocumentosVehiculosHandler docs={docs} onCargar={handleCargar} />
          )}
        />
        {/* Hasta aca llegaria lo que seria la pagina, Este bonton seria el volver */}
        <NavButtonPosition />
        <ContainerCargador
          show={showCargador}
          onHide={() => setShowCargador(false)}
          idVehiculo={idVehiculo || undefined}
          tipoDocumento={tipoDoc}
          entityLabel={entity}
          onSuccess={handleRefresh}
        />
      </GeneralContainer>
    </>
  );
}
