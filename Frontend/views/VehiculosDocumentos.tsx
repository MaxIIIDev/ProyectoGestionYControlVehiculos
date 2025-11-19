import FormBrowser from "../src/Components/FormBuscador/FormBrowser";
import NavButtonPosition from "../src/Components/NavButtonPosition";
import Enrouters from "../src/Components/Routes/Enrouters";

export default function VehiculosDocumentos() {
  return (
    <>
      <h2>Documentos de Vehículos</h2>
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
          <div>
            <p>
              <strong>Patente:</strong> {vehicle.patente}
              <strong>Marca:</strong> {vehicle.marca}
            </p>
          </div>
        )}
        renderRelated={(docs) => (
          <table border={1} cellPadding={4}>
            <thead>
              <tr>
                <th>IdDocumento</th>
                <th>Tipo</th>
                <th>UrlArchivos</th>
                <th>FechaEmision</th>
                <th>FechaVencimiento</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc: { [key: string]: string | number }) => (
                <tr key={doc.IdDocumento}>
                  <td>{doc.IdDocumento}</td>
                  <td>{doc.Tipo}</td>
                  <td>{doc.UrlArchivos}</td>
                  <td>{doc.FechaEmision}</td>
                  <td>{doc.FechaVencimiento}</td>
                  <td>{doc.Estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      />

      <NavButtonPosition />
    </>
  );
}
