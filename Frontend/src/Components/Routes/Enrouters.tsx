const API_ROUTE = "http://localhost:5097/api";

export const endpointsAPI = {
  vehiculos: {
    nuevo: { action: `${API_ROUTE}/Vehiculos`, method: "POST" },
    listar: { action: `${API_ROUTE}/Vehiculos`, method: "GET" },
    editar: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "PUT",
    },
    bajaLogica: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/baja/${id}`,
      method: "PATCH",
    },
    altaLogica: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/alta/${id}`,
      method: "PATCH",
    },
    eliminar: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "DELETE",
    },
    buscarPorId: {
      action: (id: number) => `${API_ROUTE}/Vehiculos/${id}`,
      method: "GET",
    },
    buscarPorPatente: {
      action: (patente: string) =>
        `${API_ROUTE}/Vehiculos/buscarPorPatente/${patente}`,
      method: "GET",
    },
    buscarPorPatenteLike: {
      action: (patente: string) =>
        `${API_ROUTE}/Vehiculos/buscarPorPatenteLike/${patente}`,
      method: "GET",
    },
    asignarAVehiculo: {
      action: (idVehiculo: number, idMatafuego: number) =>
        `${API_ROUTE}/vehiculos/asignarMatafuego/${idVehiculo}/${idMatafuego}`,
      method: "PUT",
    },
  },
  controlKilometraje: {
    nuevo: { action: `${API_ROUTE}/registro-kilometraje`, method: "POST" },
    buscarUltimoRegistroPorVehiculoId: {
      action: (vehiculoId: number) =>
        `${API_ROUTE}/registro-kilometraje/latest/${vehiculoId}`,
      method: "GET",
    },
    listar: {
      action: (patente: string) =>
        `${API_ROUTE}/registro-kilometraje/listado/${patente}`,
      method: "GET",
    },
    editar: {
      action: (id: number) => `${API_ROUTE}/registro-kilometraje/${id}`,
      method: "PUT",
    },
    buscarPorId: {
      action: (id: number) => `${API_ROUTE}/registro-kilometraje/${id}`,
      method: "GET",
    },
    bajaLogica: {
      action: (id: number) => `${API_ROUTE}/registro-kilometraje/baja/${id}`,
      method: "PATCH",
    },
    altaLogica: {
      action: (id: number) => `${API_ROUTE}/registro-kilometraje/alta/${id}`,
      method: "PATCH",
    },
  },
  documentos: {
    nuevo: { action: `${API_ROUTE}/Documentos`, method: "POST" },
    listar: { action: `${API_ROUTE}/Documentos`, method: "GET" },
    editar: {
      action: (id: number) => `${API_ROUTE}/Documentos/${id}`,
      method: "PUT",
    },
    eliminar: {
      action: (id: number) => `${API_ROUTE}/documentos/${id}`,
      method: "DELETE",
    },
    buscarPorId: {
      action: (id: number) => `${API_ROUTE}/Documentos/${id}`,
      method: "GET",
    },
    buscarPorVehiculoId: {
      action: (vehiculoId: number) =>
        `${API_ROUTE}/Documentos/vehiculo/${vehiculoId}`,
      method: "GET",
    },
    buscarPorMatafuegoId: {
      action: (matafuegoId: number) =>
        `${API_ROUTE}/documentos/matafuego/${matafuegoId}`,
      method: "GET",
    },
    cargarDocumento: {
      action: (documentoId: number) =>
        `${API_ROUTE}/Documentos/archivo/${documentoId}`,
      method: "GET",
    },
    bajaLogica: {
      action: (documentoId: number) =>
        `${API_ROUTE}/Documentos/baja/${documentoId}`,
      method: "PATCH",
    },
  },
  checklist: {
    nuevo: { action: `${API_ROUTE}/Checklist`, method: "POST" },
    listar: { action: `${API_ROUTE}/Checklist`, method: "GET" },
    editar: {
      action: (id: number) => `${API_ROUTE}/Checklist/${id}`,
      method: "PUT",
    },
    eliminar: {
      action: (id: number) => `${API_ROUTE}/Checklist/${id}`,
      method: "DELETE",
    },
    buscarPorId: {
      action: (id: number) => `${API_ROUTE}/Checklist/${id}`,
      method: "GET",
    },

    bajaLogica: {
      action: (id: number) => `${API_ROUTE}/Checklist/baja/${id}`,
      method: "PATCH",
    },
    altaLogica: {
      action: (id: number) => `${API_ROUTE}/Checklist/alta/${id}`,
      method: "PATCH",
    },
    listarPorVehiculoId: {
      action: (vehiculoId: number) =>
        `${API_ROUTE}/Checklist/vehiculo/${vehiculoId}`,
      method: "GET",
    },
  },
  matafuegos: {
    listar: {
      action: (nroPagina: number, tamanoPagina: number): string =>
        `${API_ROUTE}/matafuegos?numeroPagina=${nroPagina}&tamanoPagina=${tamanoPagina}`,
      method: "GET",
    },
    nuevo: {
      action: `${API_ROUTE}/matafuegos`,
      method: "POST",
    },
    editar: {
      action: (id: number) => `${API_ROUTE}/matafuegos/${id}`,
      method: "PUT",
    },
    eliminar: {
      action: (id: number) => `${API_ROUTE}/matafuegos/${id}`,
      method: "DELETE",
    },
    buscarPorId: {
      action: (id: number) => `${API_ROUTE}/matafuegos/${id}`,
      method: "GET",
    },
    bajaLogica: {
      action: (id: number) => `${API_ROUTE}/matafuegos/baja/${id}`,
      method: "PATCH",
    },
    altaLogica: {
      action: (id: number) => `${API_ROUTE}/matafuegos/alta/${id}`,
      method: "PATCH",
    },

    buscarPorNroSerie: {
      action: (nroSerie: string) => {
        return `${API_ROUTE}/matafuegos/buscarPorNroSerie/${nroSerie}`;
      },
      method: "GET",
    },
  },
  mantenimiento: {
    nuevo: { action: `${API_ROUTE}/Mantenimiento`, method: "POST" },
    listarPorVehiculoId: {
      action: (vehiculoId: number) =>
        `${API_ROUTE}/Mantenimiento/vehiculo/${vehiculoId}`,
      method: "GET",
    },
  },
};
//ENDPOINTS DEL FRONTEND
export const endpointFront = {
  home: {
    action: "/",
  },
  vehiculos: {
    listar: { action: "/Vehiculos/Listar" },
    nuevo: { action: "/Vehiculos/Nuevo" },
    actualizar: {
      action: (id: number) => {
        return "/Vehiculos/Actualizar/" + id;
      },
      endpoint: "/Vehiculos/Actualizar/:id",
    },
    gestion: { action: "/VehiculosGestion" },
    documentos: { action: "/Vehiculos/Documentacion" },
  },
  mantenimiento: {
    listar: { action: "/Mantenimiento/Listar" },
    nuevo: { action: "/Mantenimiento/Nuevo" },
    gestion: { action: "/Mantenimiento" },
    nuevoEx: { action: "/Mantenimiento/NuevoExcepcional" },
  },
  controlKilometraje: {
    listar: { action: "/KilometrosListar" },
    gestion: { action: "/ControlKilometraje" },
    nuevo: { action: "/RegistroKilometraje/Nuevo" },
    actualizar: {
      action: (id: number) => {
        return "/RegistroKilometraje/Actualizar/" + id;
      },
      endpoint: "/RegistroKilometraje/Actualizar/:id",
    },
  },
  matafuegos: {
    gestion: { action: "/Matafuegos" },
    agregar: { action: "/Matafuegos/Nuevo" },
    editar: {
      action: (id: number) => {
        return "/Matafuegos/Editar/" + id;
      },
      endpoint: "/Matafuegos/Editar/:id",
    },
    listar: {
      action: "/Matafuegos/Listar",
    },
    asignarAVehiculo: {
      action: "/Matafuegos/AsignarAVehiculo",
    },
    documentos: {
      action: "/Matafuegos/Documentacion",
    },
  },
  neumaticos: {
    gestion: { action: "/Neumaticos" },
  },
  checklist: {
    gestion: { action: "/Checklist" },
    listar: { action: "/Checklist/Listar" },
  },
};
export default endpointsAPI;
