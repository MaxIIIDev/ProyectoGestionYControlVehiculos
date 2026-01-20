import { useState } from "react";
import { type VehiculoSchemaType } from "../../types/Vehiculo.schema";
import type { NeumaticoType } from "../../types/Neumatico.schema";
import type { PaginaResponseType } from "../../types/PaginaResponse.Type";

export const AsignarNeumaticos = () => {
  const [vehiculo, setVehiculo] = useState<VehiculoSchemaType | null>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [neumaticosColocados, setNeumaticosColocados] = useState<
    PaginaResponseType<NeumaticoType>
  >({
    data: [],
    totalPaginasCalculadas: 0,
    paginaActual: 1,
    tamanoPaginas: 10,
  });
  return <div>Listar Neumaticos</div>;
};
